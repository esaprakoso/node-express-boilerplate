import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/auth.js';
import userRoutes from '../src/routes/user.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

let createdUserId = null;
let createdToken = null;
const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'TestPassword123',
  role: 'admin'
};

describe('Auth & User API', () => {
  // 1. Cek register tanpa data
  it('❌ Gagal register tanpa data', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});

    expect(res.statusCode).toBe(400); // atau sesuai yang kamu return
    expect(res.body.message || res.body.error).toBeDefined();
  });

  // 2. Register dengan data valid
  it('✅ Berhasil register dengan data lengkap', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201); // atau sesuai yang kamu return
    expect(res.body.user).toBeDefined();
    expect(res.body.user.username).toBe(testUser.username);
    createdUserId = res.body.user.id;
  });

  // 3. Login
  it('📄 Login dengan data yang sudah dibuat', async () => {
    const res = await request(app)
      .post(`/api/auth/login`).send(testUser);

    createdToken = res.body.token
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.token).toBeDefined();
  });

  // 4. Ambil detail user by userId
  it('📄 Ambil detail user by userId', async () => {
    const res = await request(app)
      .get(`/api/users/${createdUserId}`)
      .set('Authorization', 'Bearer ' + createdToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.username).toBe(testUser.username);
  });

  // 5. Ambil semua user
  it('📄 Ambil semua user', async () => {
    const res = await request(app)
      .get(`/api/users`)
      .set('Authorization', 'Bearer ' + createdToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  // 6. Hapus user by userId
  it('🗑️ Hapus user by userId', async () => {
    const res = await request(app)
      .delete(`/api/users/${createdUserId}`)
      .set('Authorization', 'Bearer ' + createdToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body.success).toBeDefined();
  });
});
