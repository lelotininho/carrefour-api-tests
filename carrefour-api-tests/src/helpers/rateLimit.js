const { rateLimit } = require('../config/env');

// Executa N requests em sequência e mede status
async function burstRequests(fn, n = rateLimit + 10) {
  const results = [];
  for (let i = 0; i < n; i++) {
    // Delay mínimo para não enfileirar demais
    // Ajuste conforme necessidade
    // eslint-disable-next-line no-await-in-loop
    const res = await fn();
    results.push(res.status);
  }
  return results;
}

module.exports = { burstRequests };
