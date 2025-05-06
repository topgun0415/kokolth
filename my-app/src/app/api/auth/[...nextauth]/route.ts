import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabase client initialize with correct URL format
const supabase = createClient(
  supabaseUrl!,
  supabaseKey!
);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'mail',
      name: 'Email Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        
        if (!credentials?.email) {
          return null;
        }
        const email = credentials.email;

        // Check if the user exists in the database
        const { data: userRecord } = await supabase
          .from('user')
          .select('*')
          .eq('email', email)
          .eq('provider', 'mail')
          .single();

        if (!userRecord) {
          // magic link send
          const { error: magicLinkError } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
            }
          });

          

          if (magicLinkError) {
            throw new Error('認証メールを送信できませんでした');
          }

          // magic link send complete
          throw new Error('magic_link_sent');
        }

        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, 
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 7 * 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({ token, user, account }) {
      
      // Initial sign in
      if (account && user) {
        
        try {
          const provider = account.provider; 
          const timestamp = new Date().toISOString();
          
          // Google Login
          if(provider === 'google'){
            // Select User from Supabase
            const { data: existingUser } = await supabase
              .from('user')
              .select('*')
              .eq('email', user.email)
              .single();
            if (existingUser) {
              // Update existing user
              await supabase
                .from('user')
                .update({
                  name: user.name,
                  provider: provider,
                  updated_at: timestamp
                })
                .eq('email', user.email);
            } else {
              // Create new user
              await supabase
                .from('user')
                .insert({
                  email: user.email,
                  name: user.name,
                  is_admin: false,
                  provider: provider,
                  created_at: timestamp,
                  updated_at: timestamp,
                  is_deleted: false
                });
            }

          // Line Login
          }else if(provider === 'line'){
            // Select User from Supabase
            const { data: existingUser } = await supabase
              .from('user')
              .select('*')
              .eq('provider_id', user.id)
              .single();
            if (existingUser) {
              // Update existing user
              await supabase
                .from('user')
                .update({
                  name: user.name,
                  provider: provider,
                  updated_at: timestamp
                })
                .eq('provider_id', user.provider_id);
            } else {
              // Create new user
              await supabase
                .from('user')
                .insert({
                  name: user.name,
                  is_admin: false,
                  provider: provider,
                  provider_id: user.id,
                  created_at: timestamp,
                  updated_at: timestamp,
                  is_deleted: false
                });
            }

          // Email Login(Custom)
          }else if(provider === 'mail') {
            
            console.log('mail login');

          }
            
        } catch {
          throw new Error("DBのエラー発生");
        }
        
        return {
          ...token,
          accessToken: account.access_token as string,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
          refreshToken: account.refresh_token as string,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return token;
    },
    async session({ session, token }) {
      session.user = token.user || session.user;
      session.accessToken = token.accessToken as string;
      session.error = token.error;
      
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
