import { createPool } from "mysql2/promise";
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
});

export { pool };
