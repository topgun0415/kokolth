import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function POST(request: NextRequest) {

  try {

    const { email, password } = await request.json();

    // Check if user exists in database
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('user')
      .select('id, email')
      .eq('email', email)
      .single();

    if (checkError) {
      return NextResponse.json({ error: '登録情報の取得に失敗しました' }, { status: 500 });
    }

    if(existingUser) {
      // When user existsted
      return NextResponse.json(
        {
          message: '登録情報は既に存在しています'
        },
        { status: 200 }
      ) 
    } else {
      // When user not existsted Send email
      const { error } = await supabaseAdmin.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
        }
      })
      // Something wrong with sending email
      if (error) {
        return NextResponse.json({ error: 'メール送信に失敗しました' }, { status: 500 });
      }
      return NextResponse.json({ message: 'メール送信に成功しました' }, { status: 200 });
    }  
  } catch {
    return NextResponse.json({ error: 'メール送信に失敗しました' }, { status: 500 });
  }
}