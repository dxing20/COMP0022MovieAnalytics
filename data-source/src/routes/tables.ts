import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { checkValidationResult } from "@comp0022/common";
import { pool } from "../service/postgres";
import { QueryResult } from "pg";

const router: Router = Router();

router.post("/api/data/tables", async (req: Request, res: Response) => {
  let tables: QueryResult<any>;

  // Check if table exists and get columns
  try {
    tables = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE  table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');"
    );
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get information schema");
  }

  res.status(200).send({
    tableNames: tables.rows
      .map((row) => row.table_name)
      .filter((name) => {
        return name !== "users";
      }),
  });
});

export { router as tablesRouter };
