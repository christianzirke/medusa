import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
import http from 'http';
import os from 'os';

import l from './logger';

import installValidator from './openapi';

const app = express();
const { exit } = process;

export default class ExpressServer {
  private routes: (app: Application) => void;
  
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded(
        {
          extended: true,
          limit: process.env.REQUEST_LIMIT || '100kb',
        },
      ),
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    app.use(session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
  }
  
  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }
  
  listen(port: number): Application {
    const welcome = (p: number) => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
        'development'} @: ${os.hostname()} on port: ${p}}`,
      );
    
    installValidator(app, this.routes)
      .then(() => {
        http.createServer(app).listen(port, welcome(port));
      })
      .catch(e => {
        l.error(e);
        exit(1);
      });
    
    return app;
  }
}
