import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../server';

import * as HTTPStatus from 'http-status';

let user;

describe('User authentication', () => {
  before(async () => {
    const response = await request(Server)
      .post('/api/v1/users')
      .send({ name: 'John Doe', email: 'john@doe.com', password: 'john@doe' });
    
    user = response.body;
  });
  
  it('should login', () =>
    request(Server)
      .post('/login')
      .send({ email: 'john@doe.com', password: 'john@doe' })
      .expect('Content-Type', /json/)
      .then(
        r => {
          expect(r.status).to.be.eq(HTTPStatus.OK);
          expect(r.body).to.be.an('object');
          expect(r.body.password).to.be.undefined;
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
