import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../server';
import * as HTTPStatus from 'http-status';

let user;
let agent = request.agent(Server);

describe('User CRUD', () => {
  before(async () => {
    const response = await agent
      .post('/api/v1/users')
      .send(
        {
          name: 'John Doe',
          email: 'john@doe.com',
          password: 'john@doe',
          books: [
            {
              name: 'My Book 1',
            },
          ],
        },
      );
    
    user = response.body;
  });
  
  it('creating a book without being logged in', () =>
    agent
      .post('/api/v1/books')
      .send({
        name: 'Sequelize 101',
        // email: 'john@doe.com',
        // password: 'john@doe',
      })
      .then(
        (r) => {
          expect(r.status).to.be.eq(401);
        },
      ),
  );
  
  it('should login', () =>
    agent
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
  
  it('find all', () =>
    agent
      .get(`/api/v1/users?limit=abacata`)
      .expect('Content-Type', /json/)
      .then(
        (r) => {
          expect(r.body).to.be.an('object').and.to.have.all.keys(['count', 'page', 'limit', 'rows']);
        },
      ),
  );
  
  it('should not have password', () =>
    agent
      .get(`/api/v1/users/${user.id}`)
      .expect('Content-Type', /json/)
      .then(
        (r) => {
          expect(r.body.password).to.be.undefined;
        },
      ),
  );
  
  it('should create book to logged user', () =>
    agent
      .post('/api/v1/books')
      .send({ name: 'Sequelize 101' })
      // .expect('Content-Type', /json/)
      .then(
        (r) => {
          expect(r.status).to.be.eq(201);
          expect(r.body.userId).to.be.eq(user.id);
        },
      ),
  );
  
  after(() =>
    agent
      .delete(`/api/v1/users/${user.id}`),
  );
});
