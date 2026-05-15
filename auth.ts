import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma"



export const { auth, handlers, signIn, signOut} = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }

            return token;
        },

        async session({ session, token}) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name
            }

            return session;
        }
    }
});
