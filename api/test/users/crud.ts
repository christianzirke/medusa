import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../server';

import * as HTTPStatus from 'http-status';

describe('User authentication', () => {
  it('should read all', () =>
    request(Server)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .then(
        r => {
          expect(r.status).to.be.eq(HTTPStatus.OK);
          expect(r.body).to.be.an('array')
            .of.length(0);
        },
      ),
  );
});
