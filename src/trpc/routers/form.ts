import { TRPCError } from '@trpc/server';
import { protectedProcedure, publicProcedure, router } from '../procedures';
import * as z from 'zod';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

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
          },
        });
      } catch (error) {
        throw new TRPCError({ code: 'UNPROCESSABLE_CONTENT' });
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
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return deletedForm;
    }),

  addFormDetails: protectedProcedure
    .input(
      z.object({
        formId: z.string(),
        formTitle: z.string(),
        formDescription: z.string().optional(),
        formSubmitText: z.string().optional(),
        buttonAlignment: z.string().optional(),
        fields: z.array(
          z.object({
            fieldId: z.string(),
            fieldQuestion: z.string(),
            fieldType: z.string(),
            required: z.boolean().optional(),
            placeholder: z.string().optional(),
            rows: z.number().optional(),
            minChars: z.number().optional(),
            maxChars: z.number().optional(),
            options: z.array(z.string()).optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // check if workspace exists
      const formExists = await prisma.form.findFirst({
        where: {
          id: input.formId,
        },
      });

      let updatedForm;

      if (formExists) {
        updatedForm = await prisma.form.update({
          where: {
            id: input.formId,
          },
          data: {
            formFields: {
              formTitle: input.formTitle,
              formDescription: input.formDescription,
              formSubmitText: input.formSubmitText,
              buttonAlignment: input.buttonAlignment,
              fields: input.fields as Prisma.JsonArray,
            } as Prisma.JsonObject,
          },
        });
      } else {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return updatedForm;
    }),

  getFormDetails: publicProcedure
    .input(z.object({ formId: z.string() }))
    .query(async ({ ctx, input }) => {
      const formDetails = await prisma.form.findFirst({
        where: {
          id: input.formId,
        },
      });

      return JSON.stringify(formDetails?.formFields);
    }),
});
