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

        return NextResponse.json({ message: 'ログインに成功しました', user: data.user }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'ログインに失敗しました' }, { status: 500 });
    }
}