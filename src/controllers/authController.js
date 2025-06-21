
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password, name, role } = req.body;
  const cek = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (cek.rows.length) {
    return res.status(409).json({ error: 'User Exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query('INSERT INTO users (username, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id,username,name,password', [username, hashed, name, role]);
  res.status(201).json({ user: result.rows[0] });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ user:{
    username: user.username,
    name: user.name,
    role: user.role,
  }, token });
};
