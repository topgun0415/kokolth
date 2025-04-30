import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
  }
  
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    password?: string | null;
    image?: string | null;
    provider_id?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    user?: User;
    error?: string;
  }
} 