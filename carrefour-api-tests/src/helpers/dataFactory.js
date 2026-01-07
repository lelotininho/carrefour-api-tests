const { faker } = require('@faker-js/faker');

function validUser({ admin = 'true' } = {}) {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 10 }),
    administrador: admin
  };
}

function invalidUsers() {
  return [
    { nome: '', email: '', password: '', administrador: '' },
    { nome: 'A', email: 'not-an-email', password: '123', administrador: 'maybe' },
    { nome: null, email: null, password: null, administrador: null }
  ];
}

module.exports = { validUser, invalidUsers };
