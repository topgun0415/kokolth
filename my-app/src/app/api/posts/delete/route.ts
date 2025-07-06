import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';
import { createClient } from '@supabase/supabase-js';

export async function DELETE(request: NextRequest) {
  try {
    // Get token from cookie
    const accessToken = request.cookies.get('supabase-access-token')?.value;
    const refreshToken = request.cookies.get('supabase-refresh-token')?.value;
    
    if (!accessToken) {
      return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 });
    }

    // Create client and check session
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'サーバー設定エラー' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { 
        detectSessionInUrl: false, 
        persistSession: false 
      }
    });

    // Set session
    const { data: { session }, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || ''
    });

    if (sessionError || !session) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 });
    }

    // Check user info and admin permission
    const { data: userData, error: userError } = await supabaseAdmin
      .from('user')
      .select('id, is_admin')
      .eq('email', session.user.email)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'ユーザー情報の取得に失敗しました' }, { status: 404 });
    }

    if (!userData.is_admin) {
      return NextResponse.json({ error: '管理者権限が必要です' }, { status: 403 });
    }

    // Parse request data
    const { id } = await request.json();

    // Validation
    if (!id?.trim()) {
      return NextResponse.json({ error: '記事IDが必要です' }, { status: 400 });
    }

    // Check if post exists
    const { data: existingPost, error: checkError } = await supabaseAdmin
      .from('post')
      .select('id, title')
      .eq('id', id)
      .single();

    if (checkError || !existingPost) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 });
    }

    // Delete the post
    const { error: deleteError } = await supabaseAdmin
      .from('post')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json(
        { error: '記事の削除に失敗しました', details: deleteError.message }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: '記事を削除しました',
      deletedPost: {
        id: existingPost.id,
        title: existingPost.title
      }
    });

  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'リクエストの形式が正しくありません' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' }, 
      { status: 500 }
    );
  }
} 