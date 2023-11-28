import { router } from "../procedures";
import { formRouter } from "./form";
import { helloRouter } from "./hello";
import { workspaceRouter } from "./workspace";

export const appRouter = router({
  hello: helloRouter,
  workspace: workspaceRouter,
  form: formRouter,
});

export type AppRouter = typeof appRouter;
