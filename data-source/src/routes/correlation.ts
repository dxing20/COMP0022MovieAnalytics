import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { checkValidationResult } from "@comp0022/common";
import { pool } from "../service/postgres";

const router: Router = Router();

router.post(
    "/api/data/correlation",
    [
        body("tablename").trim().notEmpty().withMessage("Table name not provided"),
        body("column1").trim().notEmpty().withMessage("First column not provided"),
        body("column2").trim().notEmpty().withMessage("Second column not provided"),
    ],
    checkValidationResult,
    async (req: Request, res: Response) => {
        const { tablename, column1, column2 } = req.body;

        try {
            const query = `
        SELECT
          corr(${column1}::float, ${column2}::float) AS correlation,
          regr_slope(${column1}::float, ${column2}::float) AS slope,
          regr_intercept(${column1}::float, ${column2}::float) AS intercept,
          avg(${column1}) AS avg_${column1},
          stddev(${column1}) AS stddev_${column1},
          variance(${column1}) AS variance_${column1},
          avg(${column2}) AS avg_${column2},
          stddev(${column2}) AS stddev_${column2},
          variance(${column2}) AS variance_${column2}
        FROM ${tablename};
      `;

            const result = await pool.query(query);
            res.status(200).send(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Error performing the analysis" });
        }
    }
);

export { router as correlationRouter };