import { Sequelize } from 'sequelize';
import device, { deviceAssociate, deviceInit } from './models/device';
import user, { userAssociate, userInit } from './models/user';
import book, { bookAssociate, bookInit } from './models/book';

import bookDevice, { bookDeviceInit } from './models/book.device';

const sequelize = new Sequelize('medusa', process.env.MYSQL_USER || 'root', process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

userInit(sequelize);
deviceInit(sequelize);
bookInit(sequelize);
bookDeviceInit(sequelize);

const models = { user, device, book, bookDevice };
userAssociate(models);
deviceAssociate(models);
bookAssociate(models);

sequelize.sync();

export default sequelize;