import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function POST(request: NextRequest) {
    const supabase = supabaseAdmin;
    try {
        const { email, password } = await request.json();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            let errorMessage = 'ログインに失敗しました';
            let statusCode = 500;
            
            switch (error.message) {
                case 'Invalid login credentials':
                    errorMessage = 'メールアドレスまたはパスワードが間違っています';
                    statusCode = 401;
                    break;
                case 'Email not confirmed':
                    errorMessage = 'メール認証がまだ完了していません';
                    statusCode = 401;
                    break;
                case 'Too many requests':
                    errorMessage = 'しばらく待ってから再試行してください';
                    statusCode = 429;
                    break;
            }
            
            return NextResponse.json({ 
                error: errorMessage, 
                errorType: error.message 
            }, { status: statusCode });
        }

        // user information
        const { data: userData } = await supabase
          .from('user')
          .select('id, name, email, is_admin')
          .eq('email', data.user.email)
          .single();

        // session cookie
        const response = NextResponse.json({ 
          message: 'ログインに成功しました', 
          user: userData || { id: '', name: '', email: data.user.email, is_admin: false }
        }, { status: 200 });
        
        if (data.session) {
          // Access token and refresh token to cookie
          response.cookies.set('supabase-access-token', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: data.session.expires_in
          });
          
          response.cookies.set('supabase-refresh-token', data.session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
          });
        }
        return response;
    } catch {
        return NextResponse.json({ error: 'ログインに失敗しました' }, { status: 500 });
    }
}