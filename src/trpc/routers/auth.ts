import * as z from 'zod';
import { protectedProcedure, publicProcedure, router } from '../procedures';
import { generateHash } from '@/lib/utils';
import prisma from '@/lib/db';
import { TRPCError } from '@trpc/server';
import { cookies } from 'next/headers';
import { generateToken } from '@/lib/token-service';

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const cookieStore = cookies();
      const hashPassword = generateHash(input.password);

      try {
        const user = await prisma.user.create({
          data: {
            email: input.email,
            password: hashPassword,
          },
        });

        if (user && user.id) {
          // create a demo workspace for new users
          await prisma.workspace.create({
            data: {
              workspaceName: 'Demo workspace',
              userId: user.id,
              isDemo: true,
            },
          });
        }

        const accessToken = await generateToken({
          id: user.id,
          email: user.email,
        });

        cookieStore.set('access_token', accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          secure: true,
          httpOnly: true,
        });

        return { id: user.id, email: user.email };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'unable to create an account',
        });
      }
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const cookieStore = cookies();
      const hashPassword = generateHash(input.password);

      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'either email or password is incorrect',
        });
      }

      const validPass = hashPassword === user.password;

      if (!validPass) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'either email or password is incorrect',
        });
      }

      const accessToken = await generateToken({
        id: user.id,
        email: user.email,
      });

      cookieStore.set('access_token', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        secure: true,
        httpOnly: true,
      });

      return { id: user.id, email: user.email };
    }),

  logout: protectedProcedure.mutation(() => {
    const cookieStore = cookies();
    cookieStore.delete('access_token');

    return { user: null };
  }),
});
