import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/app/api/auth/[...nextauth]/login";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials, req){
        
                if (!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials;
                
                const data = await login(username, password)
                if (!data) return null;

                return {
                    token: data.access_token,
                    accessToken: data.access_token,
                    id: data.user.id,
                    name: data.user.username
                } as any;
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user){
                token.accessToken = user.accessToken;
                token.user = user;
            } 
            
            return token;

        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;
            
            return session;
        }
    },
    pages: {
      signIn: '/' 
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};
