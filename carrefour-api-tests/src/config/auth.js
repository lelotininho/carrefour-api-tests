require('dotenv').config();
const request = require('supertest');

const baseUrl = process.env.BASE_URL;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

async function getJwtToken() {
  const res = await request(baseUrl)
    .post('/login')
    .send({ email: adminEmail, password: adminPassword });

  if (res.status !== 200) {
    throw new Error(`Falha ao autenticar: ${res.status} - ${JSON.stringify(res.body)}`);
  }

  return res.body.authorization;
}

module.exports = { getJwtToken };
