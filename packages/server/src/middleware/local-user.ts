import { createMiddleware } from "hono/factory";

export type AuthenticatedEnv = {
  Variables: {
    userId: string;
  };
};

// Auth has been removed. Sessions are still scoped by a userId column in the
// database, so we assign every request a single stable local user id. This
// keeps session queries working without requiring a logged-in user.
export const LOCAL_USER_ID = "local-user";

export const withLocalUser = createMiddleware<AuthenticatedEnv>(async (c, next) => {
  c.set("userId", LOCAL_USER_ID);
  await next();
});
