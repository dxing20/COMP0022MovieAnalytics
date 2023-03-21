import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { checkValidationResult } from "@comp0022/common";
import { pool } from "../service/postgres";
import { QueryResult } from "pg";

interface MulterRequest extends Request {
  file: any;
}

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router: Router = Router();

enum columnTypes {
  integer = "integer",
  text = "text",
  textArray = "text[]",
  numeric21 = "numeric(2,1)",
  timestamp = "timestamp",
  stringToArray = "string_to_array", // custom type
  doubleToTimestamp = "double_to_timestamp", // custom type
}

router.post(
  "/api/data/import",
  [
    body("name").trim().notEmpty().withMessage("table name not provided"),
    body("columns"),
  ],
  // checkValidationResult,
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const columns: { column: string; type: string }[] = JSON.parse(
      req.body.columns
    );

    const { path, originalName } = (req as MulterRequest).file;
    let tables: QueryResult<any>;

    // Check if table exists and get columns
    try {
      tables = await pool.query(
        "SELECT table_name FROM information_schema.tables;"
      );
    } catch (err) {
      console.error(err);
      throw new Error("Failed to get information schema");
    }

    if (
      tables.rows
        .map((row) => row.table_name)
        .filter((name) => {
          return name !== "users";
        })
        .includes(name)
    ) {
      throw new Error("Table exists");
    }

    // check if name satisfies postgres naming conventions
    if (!/^[a-z_][a-z0-9_]*$/.test(name)) {
      throw new Error("Invalid table name");
    }

    // check if columns satisfy postgres naming conventions
    if (
      !columns.every((column: { column: string; type: string }) =>
        /^[a-z_][a-z0-9_]*$/.test(column.column)
      )
    ) {
      throw new Error("Invalid column name");
    }

    // check if column types are valid
    if (
      !columns.every((column: { column: string; type: string }) => {
        if (column.type === columnTypes.integer) {
          return true;
        } else if (column.type === columnTypes.text) {
          return true;
        } else if (column.type === columnTypes.textArray) {
          return true;
        } else if (column.type === columnTypes.numeric21) {
          return true;
        } else if (column.type === columnTypes.timestamp) {
          return true;
        } else if (column.type === columnTypes.stringToArray) {
          return true;
        } else if (column.type === columnTypes.doubleToTimestamp) {
          return true;
        } else {
          return false;
        }
      })
    ) {
      throw new Error("Invalid column type");
    }
    // Create table
    let sql;
    try {
      sql = `BEGIN; CREATE TABLE ${name} (${columns
        .map((column: { column: string; type: string }) => {
          return `${column.column} ${column.type}`;
        })
        .join(", ")});`;
      if (
        columns.some(
          (column: { column: string; type: string }) =>
            column.type === columnTypes.stringToArray
        ) ||
        columns.some(
          (column: { column: string; type: string }) =>
            column.type === columnTypes.doubleToTimestamp
        )
      ) {
        sql += `CREATE TEMP TABLE tmp (${columns
          .map((column: { column: string; type: string }) => {
            return `${column.column} ${
              column.type === columnTypes.stringToArray ? "text" : column.type
            }`;
          })
          .join(", ")});`;
        sql += `COPY tmp FROM '${path}' DELIMITER ',' CSV HEADER;`;
        sql += `INSERT INTO ${name} SELECT ${columns
          .map((column: { column: string; type: string }) => {
            if (column.type === columnTypes.stringToArray) {
              return `string_to_array(${column.column}, ',')`;
            } else if (column.type === columnTypes.doubleToTimestamp) {
              return `to_timestamp(${column.column})`;
            } else {
              return column.column;
            }
          })
          .join(", ")} FROM tmp;`;
      }
      sql += `COMMIT;`;
      console.log(sql);

      await pool.query(sql);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create table");
    }

    res.status(200).send({ sql });
  }
);

export { router as importRouter };
