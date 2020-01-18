import './common/env';

import User from './api/data/models/user';
import Server from './common/server';
import routes from './routes';

import './api/data/database';

declare global {
  namespace Express {
    interface Request {
      user?: User,
      isAuthenticated: () => boolean,
    }
  }
}

const port = parseInt(process.env.PORT);
const server = new Server();

export default server.router(routes).listen(port);
