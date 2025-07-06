import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  // when user access /admin, check if user is logged in and has admin privileges
  if (request.nextUrl.pathname.startsWith('/admin')) {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // bring token from cookie
    const accessToken = request.cookies.get('supabase-access-token')?.value;
    const refreshToken = request.cookies.get('supabase-refresh-token')?.value;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { 
        detectSessionInUrl: false, 
        persistSession: false 
      }
    });

    try {
      // set session with token
      const { data: { session }, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || ''
      });
      
      if (error || !session) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // check if user is admin
      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('is_admin')
        .eq('email', session.user.email)
        .single();
      
      if (userError || !userData || !userData.is_admin) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // if conditions are met, continue with the request
  return NextResponse.next();
}

// specify the path pattern for the middleware to run
export const config = {
  matcher: [
    '/admin/:path*',  // all paths starting with /admin
  ]
}; 