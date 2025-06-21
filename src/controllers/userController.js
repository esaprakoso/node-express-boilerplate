
import pool from '../db.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  const result = await pool.query(`
    SELECT id, username, name FROM users
    WHERE username ILIKE $1
    LIMIT $2 OFFSET $3
  `, [`%${search}%`, limit, offset]);
  res.json({ data: result.rows });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query('SELECT id, username FROM users WHERE id = $1', [id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
  res.json({
    user: result.rows[0]
  });
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, password, role, name } = req.body;
  const hashed = password ? await bcrypt.hash(password, 10) : null;
  const updateQuery = `
    UPDATE users SET
      username = COALESCE($1, username),
      password = COALESCE($2, password),
      name = COALESCE($3, name),
      role = COALESCE($4, name)
    WHERE id = $5 RETURNING id, username, name, role`;
  const result = await pool.query(updateQuery, [username, hashed, name, role, id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
  res.json({
    user: result.rows[0]
  });
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
};
