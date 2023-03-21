import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { checkValidationResult } from "@comp0022/common";
import { pool } from "../service/postgres";
import { QueryResult } from "pg";

const router: Router = Router();

router.post(
  "/api/data/columns",
  [body("tableName").trim().notEmpty().withMessage("table name not provided")],
  checkValidationResult,
  async (req: Request, res: Response) => {
    const { tableName } = req.body;
    let tables: QueryResult<any>;
    let columns: QueryResult<any>;

    // Check if table exists and get columns
    try {
      tables = await pool.query(
        "SELECT table_name FROM information_schema.tables WHERE  table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');"
      );

      if (
        !tables.rows
          .map((row) => row.table_name)
          .filter((name) => {
            return name !== "users";
          })
          .includes(tableName)
      ) {
        throw new Error("Table does not exist");
      }

      columns = await pool.query(
        `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${tableName}';`
      );
    } catch (err) {
      console.error(err);
      throw new Error("Failed to get information schema");
    }

    res.status(200).send({
      columns: columns.rows.map((row) => row.column_name),
    });
  }
);

export { router as columnsRouter };
