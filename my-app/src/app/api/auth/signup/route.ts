import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function POST(request: NextRequest) {
    try {
      // Request data parsing
      const { email, authUserId, provider = 'email' } = await request.json();
      
      // Required data validation
      if (!email || !authUserId) {
        return NextResponse.json(
          { error: '必須情報が不足しています' },
          { status: 400 }
        );
      }
  
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin
        .from('user')
        .select('id')
        .eq('email', email)
        .single();
  
      if (existingUser) {
        // Update user's last login time
        const { error: updateError } = await supabaseAdmin
          .from('user')
          .update({ updated_at: new Date().toISOString() })
          .eq('email', email);
  
        if (updateError) throw updateError;
  
        return NextResponse.json({ 
          message: 'ユーザー情報が更新されました',
          userId: existingUser.id 
        });
      }
  
      // Create new user
      const timestamp = new Date().toISOString();
      const { data: newUser, error: insertError } = await supabaseAdmin
        .from('user')
        .insert({
          id: authUserId, 
          email,
          password: '',
          name: `guest${Math.floor(100000 + Math.random() * 900000)}`,
          is_admin: false,
          provider,
          created_at: timestamp,
          updated_at: timestamp,
          is_deleted: false
        })
        .select()
        .single();
  
      if (insertError) throw insertError;
  
      return NextResponse.json({
        message: '新しいユーザーが作成されました',
        user: newUser
      });
  
    } catch {
      return NextResponse.json(
        { error: 'ユーザー作成中にエラーが発生しました' },
        { status: 500 }
      );
    }
  }