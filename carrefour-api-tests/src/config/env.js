require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL || 'https://serverest.dev',
  rateLimit: Number(process.env.RATE_LIMIT_PER_MINUTE || 100),
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD
};
