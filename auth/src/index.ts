import { app } from "./app";
import { Client, Pool } from "pg";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.JWT_EXPIRATION) {
    throw new Error("JWT_EXPIRATION must be defined");
  }
  if (!process.env.POSTGRES_USERNAME) {
    throw new Error("POSTGRES_USERNAME must be defined");
  }
  if (!process.env.POSTGRES_PASSWORD) {
    throw new Error("POSTGRES_PASSWORD must be defined");
  }
  if (!process.env.POSTGRES_URI) {
    throw new Error("POSTGRES_URI must be defined");
  }

  // Connect to postgres database
  try {
    const pool = new Pool({
      user: process.env.POSTGRES_USERNAME,
      host: process.env.POSTGRES_URI,
      database: "postgres",
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    });

    // Pool emitters
    pool.on("connect", () => {
      console.log("Connected a client to the database");
    });

    pool.on("remove", () => {
      console.log("Disconnected a client from the database");
    });

    pool.on("error", (err, client) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });

    pool.query(
      "CREATE TABLE IF NOT EXISTS users (userId text UNIQUE NOT NULL, password text NOT NULL, PRIMARY KEY (userId));",
      (err, res) => {
        console.log(err, res);
      }
    );
  } catch (err) {
    console.error(err);
    throw new Error("Failed to connect to postgres database");
  }

  app.listen(3000, () => {
    console.log("Auth listening on port 3000. ");
  });
};

start();

//
