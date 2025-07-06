import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export async function GET(request: NextRequest) {
  try {
    // bring token from cookie
    const accessToken = request.cookies.get('supabase-access-token')?.value;
    const refreshToken = request.cookies.get('supabase-refresh-token')?.value;

    if (!accessToken) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { 
        detectSessionInUrl: false, 
        persistSession: false 
      }
    });

    // set session with token
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || ''
    });

    if (error || !session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // get custom user information
    const { data: userData } = await supabase
      .from('user')
      .select('id, name, email, is_admin')
      .eq('email', session.user.email)
      .single();

    return NextResponse.json({ 
      user: userData || null 
    }, { status: 200 });

  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
} 