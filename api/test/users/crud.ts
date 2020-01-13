import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../server';

let user;

describe('User CRUD', () => {
  before(async () => {
    const response = await request(Server)
      .post('/api/v1/users')
      .send(
        {
          name: 'John Doe',
          email: 'john@doe.com',
          password: 'john@doe',
        },
      );
    
    user = response.body;
  });
  
  it('find all', () =>
    request(Server)
      .get(`/api/v1/users?limit=abacata`)
      .expect('Content-Type', /json/)
      .then(
        (r) => {
          expect(r.body).to.be.an('object').and.to.have.all.keys(['count', 'page', 'limit', 'rows']);
        },
      ),
  );
  
  it('should not have password', () =>
    request(Server)
      .get(`/api/v1/users/${user.id}`)
      .expect('Content-Type', /json/)
      .then(
        (r) => {
          expect(r.body.password).to.be.undefined;
        },
      ),
  );
  
  after(() =>
    request(Server)
      .delete(`/api/v1/users/${user.id}`),
  );
});
