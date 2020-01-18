import { Sequelize } from 'sequelize';
import Device, {
  associate as deviceAssociate,
  init as deviceInit,
} from './models/device';
import User, {
  associate as userAssociate,
  init as userInit,
} from './models/user';
import Book, {
  associate as bookAssociate,
  init as bookInit,
} from './models/book';

import BookDevice, { init as bookDeviceInit } from './models/book.device';

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

const models = { User, Device, Book, BookDevice };
userAssociate(models);
deviceAssociate(models);
bookAssociate(models);

sequelize.sync() ;

export default sequelize;