import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'スラッグが必要です' }, { status: 400 });
    }

    // Get post by slug
    const { data: post, error: fetchError } = await supabaseAdmin
      .from('post')
      .select(`
        id,
        title,
        slug,
        content,
        created_at,
        user_id
      `)
      .eq('slug', slug)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'お知らせが見つかりません' }, { status: 404 });
      }
      return NextResponse.json(
        { error: 'お知らせの取得に失敗しました', details: fetchError.message }, 
        { status: 500 }
      );
    }

    if (!post) {
      return NextResponse.json({ error: 'お知らせが見つかりません' }, { status: 404 });
    }

    return NextResponse.json({ 
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        created_at: post.created_at,
        user_id: post.user_id
      }
    });

  } catch {
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' }, 
      { status: 500 }
    );
  }
} 