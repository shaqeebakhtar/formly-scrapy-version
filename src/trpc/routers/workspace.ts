import prisma from "@/lib/db";
import { protectedProcedure, router } from "../procedures";
import * as z from "zod";
import { TRPCError } from "@trpc/server";

export const workspaceRouter = router({
  getWorkspaces: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.user.id;

    let userWorkspaces = null;

    try {
      userWorkspaces = await prisma.workspace.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw new TRPCError({ code: "NOT_FOUND" });
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
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return workspace;
    }),

  createWorkspace: protectedProcedure
    .input(z.object({ workspaceName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.user.id;

      let createdWorkspace = null;

      try {
        createdWorkspace = prisma.workspace.create({
          data: {
            workspaceName: input.workspaceName,
            userId,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });
      }

      return createdWorkspace;
    }),

  renameWorkspace: protectedProcedure
    .input(z.object({ workspaceId: z.string(), workspaceName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.user.id;

      // check if workspace exists
      const workspaceExists = prisma.workspace.findFirst({
        where: {
          id: input.workspaceId,
          userId,
        },
      });

      let updatedWorkspace;

      if (!workspaceExists == null) {
        updatedWorkspace = prisma.workspace.update({
          where: {
            id: input.workspaceId,
          },
          data: {
            workspaceName: input.workspaceName,
          },
        });
      } else {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return updatedWorkspace;
    }),
});
