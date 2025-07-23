import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function GET(request: NextRequest) {
  try {
    // Get URL parameters for pagination and filtering
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    
    const offset = (page - 1) * limit;

    // Build query
    console.log('Building query for posts...');
    let query = supabaseAdmin
      .from('post')
      .select(`
        id,
        title,
        slug,
        created_at,
        user_id
      `, { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply search filter if provided
    if (search) {
      console.log('Applying search filter:', search);
      query = query.ilike('title', `%${search}%`);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    const { data: posts, error: fetchError, count } = await query;
    if (fetchError) {
      return NextResponse.json(
        { error: 'まだニュースがありません', details: fetchError.message }, 
        { status: 500 }
      );
    }

    // Calculate pagination info
    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({ 
      posts: posts || [],
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: count || 0,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch {
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' }, 
      { status: 500 }
    );
  }
}
