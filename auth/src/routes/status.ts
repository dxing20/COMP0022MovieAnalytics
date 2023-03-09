import { Request, Response, Router } from "express";
import { parseJwtPayload } from "@comp0022/common";
const router: Router = Router();

router.post(
  "/api/users/status",
  parseJwtPayload,
  (req: Request, res: Response) => {
    if (req.jwtPayload) {
      res.status(200).send({
        loggedIn: true,
        username: req.jwtPayload.username,
      });
    } else {
      res.status(200).send({
        loggedIn: false,
        username: null,
      });
    }
  }
);

export { router as statusRouter };
