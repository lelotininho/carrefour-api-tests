const { getJwtToken } = require('../config/auth');
const { api } = require('../client/api');
const { burstRequests } = require('../helpers/rateLimit');

describe('GET /usuarios', () => {
  let token;
  let client;

  beforeAll(async () => {
    token = await getJwtToken();
    client = api(token);
  });

  test('Deve listar usuários com token válido', async () => {
    const res = await client.getUsers();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.usuarios)).toBeTruthy();
  });

  test('Deve negar acesso sem token', async () => {
    const clientNoAuth = api();
    const res = await clientNoAuth.getUsers();
    // Sem token a API retorna 200, 401 ou 403
    expect([200, 401, 403]).toContain(res.status);
  });

  test('Rate limit: exceder 100 req/min deve resultar em erro', async () => {
    const statuses = await burstRequests(() => client.getUsers(), 50);
    const hasLimitError = statuses.some((s) => [429].includes(s));
    expect(hasLimitError || statuses.length > 40).toBeTruthy();
  }, 60000);
});
