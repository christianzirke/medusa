import { Model, DataTypes } from 'sequelize';

export default class bookDevice extends Model<bookDevice> {
  id: number;
  bookId: number;
  deviceId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const bookDeviceInit = (sequelize) => {
  bookDevice.init({
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
  });
};

export { bookDeviceInit };