import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Device from './device';
import Book from './book';

export default class BookDevice extends Model<BookDevice> {
  id: number;
  bookId: number;
  deviceId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

BookDevice.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'booksdevices',
  paranoid: true,
});

Book.belongsToMany(Device, {
  through: {
    model: BookDevice,
    unique: false,
  },
  foreignKey: 'bookId',
});

Device.belongsToMany(Book, {
  through: {
    model: BookDevice,
    unique: false,
  },
  foreignKey: 'deviceId',
});

BookDevice.sync({ force: true });