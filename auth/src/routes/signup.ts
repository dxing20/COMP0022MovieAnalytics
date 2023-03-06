import { Router } from "express";
import { body } from "express-validator";
import { checkValidationResult } from "@comp0022/common";

const router: Router = Router();

router.post(
  "/api/users/signin",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  checkValidationResult,
  (req, res) => {
    res.send("Hi there");
  }
);
