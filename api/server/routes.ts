import { Application } from 'express';

import userRouter from './api/controllers/users/router';
import examplesRouter from './api/controllers/examples/router';

import "./api/data/models/device"
import "./api/data/models/book"
import "./api/data/models/book.device"

import passport from 'passport';
import './api/auth/local';

export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/users', userRouter);
  
  app.get('/login',
    function(req, res) {
      res.render('login');
    },
  );
  
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.json(req['user']);
    },
  );
}