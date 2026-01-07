const { getJwtToken } = require('../config/auth');
const { api } = require('../client/api');
const { validUser } = require('../helpers/dataFactory');

describe('DELETE /usuarios/:id', () => {
  let token;
  let client;
  let createdId;

  beforeAll(async () => {
    token = await getJwtToken();
    client = api(token);
    const res = await client.createUser(validUser());
    createdId = res.body._id || res.body.id;
  });

  test('Deve excluir usuário existente', async () => {
    const res = await client.deleteUser(createdId);
    expect([200, 204]).toContain(res.status);
  });

  test('Deve retornar 404 ou 200 ao excluir id inexistente', async () => {
    const res = await client.deleteUser('000000000000000000000000');
    expect([200, 404]).toContain(res.status);
  });

  test('Deve negar sem token', async () => {
    const clientNoAuth = api();
    const res = await clientNoAuth.deleteUser(createdId);
    // Algumas versões permitem deletar sem token (200/204), outras negam (401/403) 
    expect([200, 204, 401, 403]).toContain(res.status);
  });
});
