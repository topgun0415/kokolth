import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    // 쿠키에서 토큰 가져오기
    const accessToken = request.cookies.get('supabase-access-token')?.value;
    
    if (accessToken) {
      // Supabase에서 세션 무효화
      await supabaseAdmin.auth.admin.signOut(accessToken);
    }
    
    // 성공 응답과 쿠키 삭제
    const response = NextResponse.json({ message: 'ログアウトしました' }, { status: 200 });
    
    // 쿠키 삭제
    response.cookies.set('supabase-access-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });
    
    response.cookies.set('supabase-refresh-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'ログアウトに失敗しました' }, { status: 500 });
  }
} 