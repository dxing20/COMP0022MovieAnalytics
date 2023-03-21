import { app } from "./app";
import { pool } from "./service/postgres";

const start = async () => {
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
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users (userId text UNIQUE NOT NULL, password text NOT NULL, PRIMARY KEY (userId));"
    );
  } catch (err) {
    console.error(err);
    throw new Error("Failed to connect to postgres database");
  }

  app.listen(3000, () => {
    console.log("Data Source Service listening on port 3000. ");
  });
};

start();

//
