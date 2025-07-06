import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if user exists in database
    const { data: existingUser } = await supabaseAdmin
      .from("user")
      .select("id, email")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      // When user existsted
      return NextResponse.json(
        {
          message: "登録情報は既に存在しています",
        },
        { status: 400 }
      );
    } else {
      // Check if user exists in Authentication
      const { data: authUsers, error: listError } =
        await supabaseAdmin.auth.admin.listUsers();

      if (listError) {
        return NextResponse.json(
          { error: "アカウント情報の取得に失敗しました" },
          { status: 500 }
        );
      }

      if (authUsers?.users?.find((user) => user.email === email)) {
        return NextResponse.json(
          {
            message: "登録情報は既に存在しています",
          },
          { status: 400 }
        );
      } else {
        // When user not existsted Send email and auto login
        const { data, error } = await supabaseAdmin.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
          },
        });

        if (error) {
          return NextResponse.json(
            { error: "メール送信に失敗しました" },
            { status: 500 }
          );
        }

        if (data.user) {
          const response = NextResponse.json({ message: 'メール送信に成功しました' }, { status: 200 });

          if (data.session) {
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
              maxAge: 60 * 60 * 24 * 7
            });
          }
          return response;
        } else {
          return NextResponse.json(
            { error: "予期しないエラーが発生しました" },
            { status: 500 }
          );
        }
      }
    }
  } catch {
    return NextResponse.json(
      { error: "メール送信に失敗しました" },
      { status: 500 }
    );
  }
}
