import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    // bring token from cookie
    const accessToken = request.cookies.get('supabase-access-token')?.value;
    const refreshToken = request.cookies.get('supabase-refresh-token')?.value;
    
    if (!accessToken) {
      return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 });
    }

    // create client and check session
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

    // set session
    const { data: { session }, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || ''
    });

    if (sessionError || !session) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 });
    }

    // check user info and admin permission
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

    // parse request data
    const { title, content } = await request.json();

    // validation
    if (!title?.trim()) {
      return NextResponse.json({ error: 'タイトルを入力してください' }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json({ error: '内容を入力してください' }, { status: 400 });
    }

    // create slug (convert title to URL friendly string)
    const slug = generateSlug(title);

    // check if slug is already exists
    const { data: existingPost } = await supabaseAdmin
      .from('post')
      .select('slug')
      .eq('slug', slug)
      .single();

    // if slug is already exists, add timestamp
    const finalSlug = existingPost ? `${slug}-${Date.now()}` : slug;

    // save post to database
    const { data: post, error: insertError } = await supabaseAdmin
      .from('post')
      .insert({
        user_id: userData.id,
        title: title.trim(),
        slug: finalSlug,
        content: content,  // save content as JSONB (TipTap JSON format)
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: '記事の保存に失敗しました', details: insertError.message }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: '記事を公開しました',
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        created_at: post.created_at
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' }, 
      { status: 500 }
    );
  }
}

// create slug function (convert title to URL friendly string)
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // keep Japanese characters and remove special characters
    .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, '')
    .replace(/\s+/g, '-')     // replace spaces with hyphens
    .replace(/-+/g, '-')      // remove consecutive hyphens
    .replace(/^-|-$/g, '')    // remove leading/trailing hyphens
    .substring(0, 100);       // limit length
}
