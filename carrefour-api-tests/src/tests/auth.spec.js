const { getJwtToken } = require('../config/auth');

describe('Auth via JWT', () => {
  test('Deve obter token válido com credenciais de admin', async () => {
    const token = await getJwtToken();
    expect(typeof token).toBe('string');
  });

  test('Deve negar token com credenciais inválidas', async () => {
  });
});
