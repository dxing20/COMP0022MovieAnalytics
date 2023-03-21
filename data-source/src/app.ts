import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import "express-async-errors";
import {
  AuthenticationError,
  errorHandler,
  PageNotFoundError,
} from "@comp0022/common";
import { parseJwtPayload } from "@comp0022/common";

import { Request, Response, Express } from "express";
import { columnsRouter } from "./routes/columns";
import { tablesRouter } from "./routes/tables";
import { importRouter } from "./routes/import";
import { tableRouter } from "./routes/table";
import { importRootRouter } from "./routes/importroot";

const app: Express = express();

/* Telling express that it is behind a proxy. */
app.set("trust proxy", true);
/* A middleware that parses the body of the request and makes it available on the request object. */
app.use(json({ limit: "200mb" }));
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    signed: false, // our cookie is not signed but our tokens will be
    secure: true, //  a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS)
    sameSite: "none",
  })
);

app.use(parseJwtPayload);
app.use((req: Request, res: Response, next: any) => {
  if (req.jwtPayload) {
    next();
  } else {
    throw new AuthenticationError("No authentication token");
  }
});

app.use(columnsRouter);
app.use(tablesRouter);
app.use(importRouter);
app.use(tableRouter);
app.use(importRootRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new PageNotFoundError(req.originalUrl);
});

app.use(errorHandler);

export { app };
