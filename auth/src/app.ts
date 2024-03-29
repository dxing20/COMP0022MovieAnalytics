import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import "express-async-errors";
import { errorHandler, PageNotFoundError } from "@comp0022/common";

import { Request, Response, Express } from "express";
import { statusRouter } from "./routes/status";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";

const app: Express = express();

/* Telling express that it is behind a proxy. */
app.set("trust proxy", true);
/* A middleware that parses the body of the request and makes it available on the request object. */
app.use(json());
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    signed: false, // our cookie is not signed but our tokens will be
    secure: true, //  a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS)
    sameSite: "none",
  })
);

app.use(statusRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new PageNotFoundError(req.originalUrl);
});

app.use(errorHandler);

export { app };
