import { Model, DataTypes } from 'sequelize';

export default class BookDevice extends Model<BookDevice> {
  id: number;
  bookId: number;
  deviceId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const init = (sequelize) => {
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
};

export { init };