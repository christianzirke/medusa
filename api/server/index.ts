import './common/env';

import './api/data/database';

import Server from './common/server';
import routes from './routes';

const port = parseInt(process.env.PORT);
const server = new Server();

export default server.router(routes).listen(port);
