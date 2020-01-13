import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export default class Book extends Model<Book> {
  id: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

Book.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'books',
  paranoid: true,
});

Book.sync();