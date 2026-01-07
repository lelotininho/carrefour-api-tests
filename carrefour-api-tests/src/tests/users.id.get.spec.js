const { getJwtToken } = require('../config/auth');
const { api } = require('../client/api');
const { validUser } = require('../helpers/dataFactory');

describe('GET /usuarios/:id', () => {
  let token;
  let client;
  let createdId;

  beforeAll(async () => {
    token = await getJwtToken();
    client = api(token);
    const res = await client.createUser(validUser());
    createdId = res.body._id || res.body.id;
  });

  test('Deve retornar detalhes de usuário existente', async () => {
    const res = await client.getUserById(createdId);
    expect(res.status).toBe(200);
    expect(res.body._id || res.body.id).toBe(createdId);
  });

  test('Deve retornar 400 ou 404 para id não existente', async () => {
    const res = await client.getUserById('000000000000000000000000');
    // Se o formato do ID for inválido, retorna 400; se válido mas não encontrado, retorna 404
    expect([400, 404]).toContain(res.status);
  });
});
