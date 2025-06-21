import pool from '../db.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
    const result = await pool.query(`SELECT id, username,name,role FROM users WHERE id=$1`, [req.userId]);
    res.json({ user: result.rows[0] });
};

export const updateProfile = async (req, res) => {
    const { username, name } = req.body
    const result = await pool.query(`
        UPDATE users
        SET
            username = COALESCE($1, username),
            name = COALESCE($2, name)
        WHERE id=$3
        RETURNING username, name
    `, [username, name, req.userId]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ user: result.rows[0] });
};

export const updatePassword = async (req, res) => {
    const { new_password, confirm_new_password } = req.body
    if (new_password != confirm_new_password)
        return res.status(422).json({ error: 'Konfirmasi Password tidak sama!' });

    const password_hashed = new_password ? await bcrypt.hash(new_password, 10) : null;
    
    const result = await pool.query(`
        UPDATE users
        SET
            password = COALESCE($1, password)
        WHERE id=$2
        RETURNING username, name
    `, [password_hashed, req.userId]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ user: result.rows[0] });
};