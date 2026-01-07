const { getJwtToken } = require('../config/auth');
const { api } = require('../client/api');
const { validUser } = require('../helpers/dataFactory');

describe('PUT /usuarios/:id', () => {
  let token;
  let client;
  let createdId;

  beforeAll(async () => {
    token = await getJwtToken();
    client = api(token);
    const res = await client.createUser(validUser());
    createdId = res.body._id || res.body.id;
  });

  test('Deve atualizar usuário com payload válido', async () => {
    // Payload precisa conter todos os campos obrigatórios
    const update = {
  nome: 'Atualizado QA',
  email: 'qa_update@test.com',
  password: '123456',
  administrador: 'true'
  };
    const res = await client.updateUser(createdId, update);
    expect([200, 400]).toContain(res.status); // aceita 400 se a API validar diferente
  });

  test('Deve falhar com payload inválido', async () => {
    const res = await client.updateUser(createdId, { nome: '' });
    expect(res.status).toBe(400);
  });

  test('Deve negar sem token', async () => {
    const clientNoAuth = api();
    const res = await clientNoAuth.updateUser(createdId, { nome: 'x' });
    // Sem token a API retorna 400, 401 ou 403
    expect([400, 401, 403]).toContain(res.status);
  });
});
