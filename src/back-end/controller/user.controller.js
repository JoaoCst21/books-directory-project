import { pool } from "../model/DAO/connection.js";

const getAll = async (req, res) => {
  const [[data]] = await pool.execute("call sp_user_readall()");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const create = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  await pool.execute("call sp_user_create(?, ?, ?, ?)", [
    name,
    lastName,
    password,
    email,
  ]);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ name, lastName, password, email }));
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, password } = req.body;
  console.log(typeof id);
  const [[[data]]] = await pool.execute("call sp_user_read(?)", [id]);
  await pool.execute("call sp_user_update(?, ?, ?, ?, ?)", [
    id,
    name,
    lastName,
    password,
    email,
  ]);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify([data, { id: +id, name, lastName, password, email }]));
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const [[[data]]] = await pool.execute("call sp_user_read(?)", [id]);
  await pool.execute("call sp_user_delete(?)", [id]);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const get = async (req, res) => {
  const { id } = req.params;
  const [[[data]]] = await pool.execute("call sp_user_read(?)", [id]);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
const controller = { getAll, create, update, delete: destroy, get };
export default controller;
