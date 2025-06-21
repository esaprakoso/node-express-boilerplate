import pool from '../db.js';

export const getRoles = async (req, res) => {
    const result = await pool.query(`SELECT name,description FROM roles`);
    res.json(result.rows);
};