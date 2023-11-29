import * as z from "zod";

export const createFormSchema = z.object({
  formName: z.string({ required_error: "Form name cannot be empty" }),
  formType: z.string().optional(),
});
