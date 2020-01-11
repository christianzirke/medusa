import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('medusa', process.env.MYSQL_USER || "root", process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;