import { router } from "../procedures";
import { helloRouter } from "./hello";
import { workspaceRouter } from "./workspace";

export const appRouter = router({
  hello: helloRouter,
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;
