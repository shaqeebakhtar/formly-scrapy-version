import { router } from '../procedures';
import { authRouter } from './auth';
import { formRouter } from './form';
import { helloRouter } from './hello';
import { workspaceRouter } from './workspace';

export const appRouter = router({
  hello: helloRouter,
  workspace: workspaceRouter,
  form: formRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
