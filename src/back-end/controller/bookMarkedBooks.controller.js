import { pool } from "../model/DAO/connection.js";

const getAll = async (req, res) => {
  const [[data]] = await pool.execute("call sp_bookMarkedBooks_readAll()");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, "", 2));
};

const create = async (req, res) => {
  const { idBook, idUser } = req.body;
  await pool.execute("call sp_bookMarkedBooks_create(?, ?)", [idUser, idBook]);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ idUser, idBook }, "", 2));
};

const get = async (req, res) => {
  const { id } = req.params;
  const [[[data]]] = await pool.execute("call sp_bookMarkedBooks_read(?)", [
    id,
  ]);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, "", 2));
};

const update = async (req, res) => {
  const { id } = req.params;
  const { idUser, idBook } = req.body;
  const [[[data]]] = await pool.execute("call sp_bookMarkedBooks_read(?)", [
    id,
  ]);
  await pool.execute("call sp_bookMarkedBooks_update(?,?,?)", [
    id,
    idUser,
    idBook,
  ]);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, "", 2));
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const [[[data]]] = await pool.execute("call sp_bookMarkedBooks_read(?)", [
    id,
  ]);
  await pool.execute("call sp_bookMarkedBooks_delete(?)"[id]);
  res.writeHead(200, { "Content=Type": "application/json" });
  res.end(JSON.stringify(data, "", 2));
};

const controller = { getAll, create, update, delete: destroy, get };
export default controller;
