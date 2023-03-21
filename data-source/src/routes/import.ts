import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { checkValidationResult } from "@comp0022/common";
import { pool } from "../service/postgres";
import { QueryResult } from "pg";
const copyFrom = require("pg-copy-streams").from;
const fs = require("fs");
import { pipeline } from "node:stream/promises";

interface MulterRequest extends Request {
  file: any;
}

const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1048576, // 50MB
  },
});

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
    if (!/^[a-z_][a-zA-Z0-9_]*$/.test(name)) {
      throw new Error("Invalid table name");
    }

    // check if columns satisfy postgres naming conventions
    if (
      !columns.every((column: { column: string; type: string }) => {
        if (/^[a-z_][a-zA-Z0-9_]*$/.test(column.column)) {
          return true;
        }
        throw new Error(
          "Invalid column name" +
            column.column +
            " " +
            /^[a-z_][a-zA-Z0-9_]*$/.test(column.column)
        );
      })
    ) {
      throw new Error("Invalid column name" + JSON.stringify(columns));
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
      throw new Error("Invalid column type" + JSON.stringify(columns));
    }
    // Create table
    let sql;
    try {
      const client = await pool.connect();
      await client.query("BEGIN");
      sql = `CREATE TABLE ${name} (${columns
        .map((column: { column: string; type: string }) => {
          if (column.type === columnTypes.stringToArray) {
            return `${column.column} text[]`;
          } else if (column.type === columnTypes.doubleToTimestamp) {
            return `${column.column} timestamp`;
          }
          return `${column.column} ${column.type}`;
        })
        .join(", ")});`;
      console.error(sql);
      client.query(sql);
      // if (
      //   columns.some(
      //     (column: { column: string; type: string }) =>
      //       column.type === columnTypes.stringToArray
      //   ) ||
      //   columns.some(
      //     (column: { column: string; type: string }) =>
      //       column.type === columnTypes.doubleToTimestamp
      //   )
      // ) {
      sql = `CREATE TEMP TABLE tmp (${columns
        .map((column: { column: string; type: string }) => {
          if (column.type === columnTypes.stringToArray) {
            return `${column.column} text`;
          } else if (column.type === columnTypes.doubleToTimestamp) {
            return `${column.column} double precision`;
          }
          return `${column.column} ${column.type}`;
        })
        .join(", ")}) ON COMMIT DROP;`;
      console.error(sql);
      await client.query(sql);
      console.error("Created temp table");

      const fileStream = fs.createReadStream(path);

      const dbStream = client.query(
        copyFrom(
          `COPY tmp FROM STDIN WITH (FORMAT csv, HEADER true, DELIMITER ',')`
        )
      );
      console.error(`Copying from ${path})`);

      await pipeline(fileStream, dbStream);

      sql = `INSERT INTO ${name} SELECT ${columns
        .map((column: { column: string; type: string }) => {
          if (column.type === columnTypes.stringToArray) {
            return `STRING_TO_ARRAY(${column.column}, '|')`;
          } else if (column.type === columnTypes.doubleToTimestamp) {
            return `to_timestamp(${column.column})`;
          } else {
            return column.column;
          }
        })
        .join(", ")} FROM tmp;`;
      console.error(sql);
      await client.query(sql);
      // }

      await client.query("COMMIT");
      console.error("Table created" + sql);
      client.release();
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create table" + sql);
    }

    res.status(200).send({ sql });
  }
);

export { router as importRouter };
