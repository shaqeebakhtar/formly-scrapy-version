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
});
