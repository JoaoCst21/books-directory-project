import mysql from "mysql2/promise.js";

export const pool = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "books_directory",
});
