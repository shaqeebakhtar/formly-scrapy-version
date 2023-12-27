import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../procedures";
import * as z from "zod";
import prisma from "@/lib/db";

export const formRouter = router({
  createForm: protectedProcedure
    .input(
      z.object({
        formName: z.string(),
        formType: z.string().optional(),
        workspaceId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let createdForm = null;
      try {
        createdForm = await prisma.form.create({
          data: {
            formName: input.formName,
            formType: input.formType,
            workspaceId: input.workspaceId,
            responses: 0,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });
      }

      return createdForm;
    }),

  deleteForm: protectedProcedure
    .input(z.object({ workspaceId: z.string(), formId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.user.id;

      // check if workspace exists
      const workspaceExists = await prisma.workspace.findFirst({
        where: {
          id: input.workspaceId,
          userId,
        },
      });

      // check if the form exists in that workspace

      let deletedForm;

      if (workspaceExists) {
        deletedForm = await prisma.form.delete({
          where: {
            id: input.formId,
            workspaceId: input.workspaceId,
          },
        });
      } else {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return deletedForm;
    }),
});
