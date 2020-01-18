import { Application } from 'express';

import userRouter from './api/controllers/users/router';
import bookRouter from './api/controllers/books/router';

import './api/data/models/device';
import './api/data/models/book';
import './api/data/models/book.device';

import passport from 'passport';
import './api/auth/local';

export default function routes(app: Application): void {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/books', bookRouter);
  
  app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      res.json(req.user);
    },
  );
}