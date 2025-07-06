import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';
import { createClient } from '@supabase/supabase-js';

export async function PUT(request: NextRequest) {
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
    const { id, title, content } = await request.json();

    // Validation
    if (!id?.trim()) {
      return NextResponse.json({ error: '記事IDが必要です' }, { status: 400 });
    }
    if (!title?.trim()) {
      return NextResponse.json({ error: 'タイトルを入力してください' }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json({ error: '内容を入力してください' }, { status: 400 });
    }

    // Additional validation for title length
    if (title.trim().length > 200) {
      return NextResponse.json({ error: 'タイトルは200文字以内で入力してください' }, { status: 400 });
    }

    // Check if post exists
    const { data: existingPost, error: checkError } = await supabaseAdmin
      .from('post')
      .select('id, title, slug')
      .eq('id', id)
      .single();

    if (checkError || !existingPost) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 });
    }

    // Generate new slug if title changed
    let newSlug = existingPost.slug;
    if (existingPost.title !== title.trim()) {
      const createSlug = (text: string): string => {
        return text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
          .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
          .substring(0, 50); // Limit length
      };

      const baseSlug = createSlug(title.trim());
      
      // Check if slug already exists
      const { data: slugCheck } = await supabaseAdmin
        .from('post')
        .select('slug')
        .eq('slug', baseSlug)
        .neq('id', id) // Exclude current post
        .single();

      if (slugCheck) {
        // If slug exists, add timestamp
        newSlug = `${baseSlug}-${Date.now()}`;
      } else {
        newSlug = baseSlug;
      }
    }

    // Update the post
    const { data: updatedPost, error: updateError } = await supabaseAdmin
      .from('post')
      .update({
        title: title.trim(),
        content: content,
        slug: newSlug
      })
      .eq('id', id)
      .select('id, title, slug')
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: '記事の更新に失敗しました', details: updateError.message }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: '記事を更新しました',
      post: {
        id: updatedPost.id,
        title: updatedPost.title,
        slug: updatedPost.slug
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