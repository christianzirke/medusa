import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export default class Device extends Model<Device> {
  id: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const init = (sequelize) => {
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
};

const associate = ({ Book, User }) => {
  Device.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId'
  });
  
  Device.belongsToMany(Book, {
    as: 'books',
    foreignKey: 'deviceId',
    through: 'BookDevice',
  });
  
  Device.sync();
};

export { associate, init };