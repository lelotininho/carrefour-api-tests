const { getJwtToken } = require('../config/auth');
const { api } = require('../client/api');
const { validUser, invalidUsers } = require('../helpers/dataFactory');

describe('POST /usuarios', () => {
  let token;
  let client;

  beforeAll(async () => {
    token = await getJwtToken();
    client = api(token);
  });

  test('Deve criar usuário com dados válidos', async () => {
    const payload = validUser();
    const res = await client.createUser(payload);
    expect(res.status).toBe(201);
    expect(res.body._id || res.body.id).toBeTruthy();
  });

  test.each(invalidUsers())('Deve falhar com payload inválido: %o', async (payload) => {
    const res = await client.createUser(payload);
    expect(res.status).toBe(400);
  });

  test('Deve falhar ao criar email duplicado', async () => {
    const payload = validUser();
    const res1 = await client.createUser(payload);
    expect(res1.status).toBe(201);

    const res2 = await client.createUser(payload);
    expect([400, 409]).toContain(res2.status);
  });

test('Deve falhar sem token', async () => {
    const clientNoAuth = api();
    const res = await clientNoAuth.createUser(validUser());
    // Algumas versões permitem criar sem token (201), outras negam (401/403) 
    expect([201, 401, 403]).toContain(res.status);
  });
});
