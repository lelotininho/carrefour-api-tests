// src/client/api.js
const request = require('supertest');
const baseUrl = process.env.BASE_URL || 'https://serverest.dev';

function api(token) {
  return {
    getUsers: () =>
      request(baseUrl).get('/usuarios').set('Authorization', token || ''),

    getUserById: (id) =>
      request(baseUrl).get(`/usuarios/${id}`).set('Authorization', token || ''),

    createUser: (payload) =>
      request(baseUrl)
        .post('/usuarios')
        .set('Authorization', token || '')
        .send(payload),

    updateUser: (id, payload) =>
      request(baseUrl)
        .put(`/usuarios/${id}`)
        .set('Authorization', token || '')
        .send(payload),

    deleteUser: (id) =>
      request(baseUrl).delete(`/usuarios/${id}`).set('Authorization', token || ''),
  };
}

module.exports = { api };
