import type { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserByEmail, getUserById } from "./db-actions";

export const authConfig: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getUserByEmail(credentials.email as string);

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user = {
          ...session.user,
          id: token.sub
        };
      }

      if (token.role && session.user) {
        session.user = {
          ...session.user,
          role: token.role as string
        };
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (user) {
        token.role = user.role;
      }

      return token;
    },
  },
}; 