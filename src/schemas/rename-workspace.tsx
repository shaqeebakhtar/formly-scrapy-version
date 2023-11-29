import * as z from "zod";

export const renameWorkspaceSchema = z.object({
  newWorkspaceName: z.string({
    required_error: "Workspace name cannot be empty",
  }),
});
