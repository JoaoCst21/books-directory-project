import { pool } from "../model/DAO/connection.js";

const getAll = async (req, res) => {
  const [[data]] = await pool.execute("call sp_book_readall()");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, "", 2));
};

const get = async (req, res) => {
  console.log(req.params, "params");
  const [[[data]]] = await pool.execute("call sp_book_read(?)", [
    req.params.id,
  ]);
  if (!data) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Book not found" }));
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, "", 2));
};

const create = async (req, res) => {
  const { title, author, description, releaseDate, pages } = req.body;
  if (!title || !author || !description || !releaseDate || !pages) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Missing data" }));
  }

  console.log(title, author, description, releaseDate, pages);
  console.log(new Date(releaseDate), "releaseDate", { releaseDate });
  await pool.execute("call sp_book_create(?, ?, ?, ?, ?)", [
    title,
    author,
    description,
    pages,
    new Date(releaseDate),
  ]);
  console.log("Book created");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(req.body, "", 2));
};

const destroy = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Missing data" }));
  }
  const [[[data]]] = await pool.execute("call sp_book_read(?)", [id]);
  await pool.execute("call sp_book_delete(?)", [id]);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, "", 2));
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, releaseDate, pages } = req.body;
  if (!id || !title || !author || !description || !releaseDate || !pages) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Missing data" }));
  }
  await pool.execute("call sp_book_update(?, ?, ?, ?, ?, ?)", [
    id,
    title,
    author,
    description,
    pages,
    new Date(releaseDate),
  ]);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(req.body, "", 2));
};

const obj = { getAll, get, create, delete: destroy, update };
export default obj;
