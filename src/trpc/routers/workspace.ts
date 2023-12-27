import prisma from '@/lib/db';
import { protectedProcedure, router } from '../procedures';
import * as z from 'zod';
import { TRPCError } from '@trpc/server';

export const workspaceRouter = router({
  getWorkspaces: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.user.id;

    let userWorkspaces = null;

    try {
      userWorkspaces = await prisma.workspace.findMany({
        where: {
          userId,
        },
        include: {
          forms: {
            select: {
              id: true,
              formName: true,
              createdAt: true,
              updatedAt: true,
              formType: true,
              workspaceId: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    } catch (error) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    return userWorkspaces;
  }),

  getWorkspaceById: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      let workspace = null;

      const userId = ctx?.user.id;

      try {
        workspace = await prisma.workspace.findFirst({
          where: {
            id: input.workspaceId,
            userId,
          },
          include: {
            forms: true,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return workspace;
    }),

  createWorkspace: protectedProcedure
    .input(z.object({ workspaceName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.user.id;

      let createdWorkspace = null;

      try {
        createdWorkspace = await prisma.workspace.create({
          data: {
            workspaceName: input.workspaceName,
            userId,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: 'UNPROCESSABLE_CONTENT' });
      }

      return createdWorkspace;
    }),

  renameWorkspace: protectedProcedure
    .input(z.object({ workspaceId: z.string(), newWorkspaceName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.user.id;

      // check if workspace exists
      const workspaceExists = await prisma.workspace.findFirst({
        where: {
          id: input.workspaceId,
          userId,
        },
      });

      let updatedWorkspace;

      if (workspaceExists) {
        updatedWorkspace = await prisma.workspace.update({
          where: {
            id: input.workspaceId,
            userId,
          },
          data: {
            workspaceName: input.newWorkspaceName,
          },
        });
      } else {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return updatedWorkspace;
    }),

  deleteWorkspace: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.user.id;

      // check if workspace exists
      const workspaceExists = await prisma.workspace.findFirst({
        where: {
          id: input.workspaceId,
          userId,
        },
      });

      let deletedWorkspace;

      if (workspaceExists) {
        deletedWorkspace = await prisma.workspace.delete({
          where: {
            id: input.workspaceId,
            userId,
          },
        });
      } else {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return deletedWorkspace;
    }),
});
