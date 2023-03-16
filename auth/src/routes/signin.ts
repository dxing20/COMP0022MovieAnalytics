import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { AuthenticationError, checkValidationResult } from "@comp0022/common";
import { pool } from "../service/postgres";
import { compareHash } from "../service/password";
import jwt from "jsonwebtoken";
import { QueryResult } from "pg";

const router: Router = Router();

router.post(
  "/api/users/signin",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 32 })
      .withMessage("Password is required"),
  ],
  checkValidationResult,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    let query: QueryResult<any>;

    // Check if user exists
    try {
      query = await pool.query("SELECT * FROM users WHERE userId = $1", [
        username,
      ]);
    } catch (err) {
      console.error(err);
      throw new Error("Cannot query database");
    }
    if (query.rows.length === 0) {
      throw new AuthenticationError("Username or password is incorrect");
    }

    // Check if password is incorrect
    if (!(await compareHash(password, query.rows[0].password))) {
      throw new AuthenticationError("Username or password is incorrect");
    }

    // Generate JWT
    const token = jwt.sign(
      {
        username,
      },
      process.env.JWT_KEY!
    );

    // Store JWT on session object
    req.session = {
      jwt: token,
    };

    res.status(200).send({
      username,
      password: query.rows[0].password,
    });
  }
);

export { router as signinRouter };
