import * as z from "zod";

export const createWorkspaceSchema = z.object({
  workspaceName: z.string({ required_error: "Workspace name cannot be empty" }),
});
