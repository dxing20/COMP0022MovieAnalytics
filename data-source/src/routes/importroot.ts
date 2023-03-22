import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { pool } from "../service/postgres";
import { QueryResult } from "pg";
import { checkValidationResult } from "@comp0022/common/build/middleware/check-validation-result";
import {
  DataNode,
  Graph,
  NodeType,
  RootNode,
  FilterNode,
  JoinNode,
  RuntimeQueryHandler,
  SortNode,
  AggregateNode,
} from "@comp0022/common/build/util/query-node";

const router: Router = Router();

router.post(
  "/api/data/importRoot",
  [
    body("serializedGraph").trim().notEmpty().withMessage("graph not provided"),
    body("importName")
      .trim()
      .notEmpty()
      .withMessage("import name not provided"),
  ],
  checkValidationResult,
  async (req: Request, res: Response) => {
    const { serializedGraph, importName } = req.body;
    // deserializing graph
    const parsed = JSON.parse(serializedGraph);

    const getTableNames = async (): Promise<string[]> => {
      let tables: QueryResult<any>;

      try {
        tables = await pool.query(
          "SELECT table_name FROM information_schema.tables WHERE  table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');"
        );
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get information schema");
      }

      return tables.rows
        .map((row) => row.table_name)
        .filter((name) => {
          return name !== "users";
        });
    };

    const getColumns = async (tableName: string): Promise<string[]> => {
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

      return columns.rows.map((row) => row.column_name);
    };

    let graph: Graph = new Graph(
      new RuntimeQueryHandler(getTableNames, getColumns)
    );

    // rebuild the graph
    graph.i = parsed.i;
    graph.nodes = parsed.nodes.map((node: any) => {
      if (node.type === NodeType.DATA) {
        const dataNode = new DataNode(node.id, node.tableName);
        dataNode.status = node.status;
        dataNode.depth = node.depth;
        dataNode.error = node.error;
        dataNode.hasParent = node.hasParent;
        dataNode.columns = node.columns;
        return dataNode;
      } else if (node.type === NodeType.ROOT) {
        const root = new RootNode(node.id, node.child);
        root.status = node.status;
        root.depth = node.depth;
        root.error = node.error;
        root.hasParent = node.hasParent;
        root.columns = node.columns;
        return root;
      } else if (node.type === NodeType.JOIN) {
        const join = new JoinNode(
          node.id,
          node.child1,
          node.child2,
          node.joinType,
          node.on1,
          node.on2
        );
        join.status = node.status;
        join.depth = node.depth;
        join.error = node.error;
        join.hasParent = node.hasParent;
        join.columns = node.columns;
        return join;
      } else if (node.type === NodeType.FILTER) {
        const filter = new FilterNode(
          node.id,
          node.child,
          node.compare,
          node.selectedColumn,
          node.value
        );
        filter.status = node.status;
        filter.depth = node.depth;
        filter.error = node.error;
        filter.hasParent = node.hasParent;
        filter.columns = node.columns;
        return filter;
      } else if (node.type === NodeType.SORT) {
        const sort = new SortNode(node.id, node.child, node.sortOrder);
        sort.status = node.status;
        sort.depth = node.depth;
        sort.error = node.error;
        sort.hasParent = node.hasParent;
        sort.columns = node.columns;
        return sort;
      } else if (node.type === NodeType.AGGREGATE) {
        const aggregate = new AggregateNode(
          node.id,
          node.child,
          node.aggregate,
          node.groupColumn,
          node.aggregateColumn
        );
        aggregate.status = node.status;
        aggregate.depth = node.depth;
        aggregate.error = node.error;
        aggregate.hasParent = node.hasParent;
        aggregate.columns = node.columns;
        return aggregate;
      } else {
        throw new Error("Unknown node type");
      }
    });
    graph.root = parsed.root;
    console.log(JSON.stringify(parsed));

    let rootSql = await graph.resolveRootQuery();

    console.log(rootSql);

    if (rootSql === null || rootSql === undefined) {
      console.log(JSON.stringify(graph));
      throw new Error("Error while resolving root query");
    }

    let sql = rootSql.resolve({
      verifiedTableNames: new Set(await getTableNames()),
    });

    let { text, params } = sql;

    const tablenames = await getTableNames();
    if (tablenames.includes(importName)) {
      throw new Error("Table already exists");
    } else if (!/^[a-z_][a-zA-Z0-9_]*$/.test(importName)) {
      // regex to check if table name is valid
      throw new Error("Invalid table name");
    } else {
      text = `CREATE TABLE ${importName} AS (${text})`;
    }
    console.log(text, params);
    let qRes;
    const regex = /\$(\d+)/g;
    let i = 1;
    text = text.replace(regex, (match, group1) => {
      return `$${i++}`;
    });

    try {
      qRes = await pool.query(text, params);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create table");
    }

    res.status(200).send({ query: { text, params }, result: qRes.rows });
  }
);

export { router as importRootRouter };
