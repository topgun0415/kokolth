import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function POST(request: NextRequest) {
    try {
        // Request data parsing
        const { email, authUserId, provider, userName } = await request.json();

        // Check if user already exists by provider_id (OAuth user ID)
        const { data: existingUser } = await supabaseAdmin
            .from('user')
            .select('id, email, name')
            .eq('provider_id', authUserId)
            .single();

        if (existingUser) {
            // User exists, just return user info (updated_at will be set by trigger)
            return NextResponse.json({ 
                message: 'ユーザー情報が更新されました',
                userId: existingUser.id,
                user: existingUser
            });
        }

        // Create new user
        const timestamp = new Date().toISOString();
        const { data: newUser, error: insertError } = await supabaseAdmin
            .from('user')
            .insert({
                email,
                name: userName,
                is_admin: false,
                is_deleted: false,
                provider: provider,
                provider_id: authUserId,
                created_at: timestamp,
                updated_at: timestamp,
            })
            .select()
            .single();

        if (insertError) throw insertError;

        return NextResponse.json({
            message: '新しいユーザーが作成されました',
            user: newUser
        });

    } catch {
        return NextResponse.json(
            { error: 'ソーシャルログイン処理中にエラーが発生しました' },
            { status: 500 }
        );
    }
}