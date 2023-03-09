import { Pool } from "pg";

let pool = new Pool({
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

const changePool = (newPool: Pool) => {
  pool = newPool;
};

export { pool, changePool };
