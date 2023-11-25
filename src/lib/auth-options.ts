import prisma from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (user && user.id) {
        // check if there is any workspace
        const workspaces = await prisma.workspace.findMany({
          where: {
            userId: user.id,
          },
        });

        // create a demo workspace for new users
        if (workspaces !== null) {
          await prisma.workspace.create({
            data: {
              workspaceName: "Demo workspace",
              userId: user.id,
              isDemo: true,
            },
          });
        }
      }
      return true;
    },

    jwt: async ({ token, profile }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: profile?.email,
        },
      });

      if (user) token.id = user.id;

      return token;
    },

    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
