import request from "supertest";
import { app } from "../app";
import { pool, changePool } from "../service/postgres";
import { newDb } from "pg-mem";

beforeAll(async () => {
  const memPool = newDb().adapters.createPg().Pool;
  changePool(new memPool());

  process.env.JWT_KEY = "test";
  process.env.ADMIN_KEY = "test";
  process.env.POSTGRES_USERNAME = "test";
  process.env.POSTGRES_PASSWORD = "test";
  process.env.POSTGRES_URI = "test";

  // Connect to postgres database
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users (userId text UNIQUE NOT NULL, password text NOT NULL, PRIMARY KEY (userId));"
    );
  } catch (err) {
    console.error(err);
    throw new Error("Failed to connect to postgres database");
  }
});

beforeEach(async () => {
  pool.query("DELETE FROM users;");
});
