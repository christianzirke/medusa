import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export default class Device extends Model<Device> {
  id: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

Device.init({
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
  tableName: 'devices',
  paranoid: true,
});

Device.sync();