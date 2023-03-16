import { Router } from "express";
import { body } from "express-validator";
import { AuthenticationError, checkValidationResult } from "@comp0022/common";
import { Request, Response } from "express";
import { pool } from "../service/postgres";
import { generateHash } from "../service/password";
import jwt from "jsonwebtoken";

const router: Router = Router();

router.post(
  "/api/users/signup",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 32 })
      .withMessage("Password is required"),
    body("adminKey")
      .trim()
      .notEmpty()
      .withMessage("Adding new users requires admin privileges"),
  ],
  checkValidationResult,
  async (req: Request, res: Response) => {
    const { username, password, adminKey } = req.body;

    // Check if admin key is correct
    if (adminKey !== process.env.ADMIN_KEY) {
      throw new AuthenticationError("Admin key is incorrect");
    }

    // Check if user exists
    try {
      let query = await pool.query("SELECT * FROM users WHERE userId = $1", [
        username,
      ]);
      if (query.rows.length !== 0) {
        throw new AuthenticationError("User already exists");
      }
    } catch (err) {
      console.error(err);
      throw new Error("Cannot query database");
    }

    // Add user to database
    const hashedPassword = await generateHash(password);
    try {
      const insertRes = await pool.query(
        "INSERT INTO users (userId, password) VALUES ($1, $2)",
        [username, hashedPassword]
      );
      if (insertRes.rowCount !== 1) {
        throw new Error("Failed to add user");
      }
    } catch (err) {
      console.error(err);
      throw new Error("Cannot query database");
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

    res.status(201).send({ username, password: hashedPassword });
  }
);

export { router as signupRouter };
