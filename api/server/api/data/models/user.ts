import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export default class User extends Model<User> {
  id: number;
  name: string;
  email: string;
  password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
  paranoid: true,
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    withPassword: {
      attributes: { exclude: [] },
    },
  },
});

User.sync();