import { Model, DataTypes } from 'sequelize';

export default class device extends Model<device> {
  id: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const deviceInit = (sequelize) => {
  device.init({
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
  });
};

const deviceAssociate = ({ book, user }) => {
  device.belongsTo(user, {
    as: 'user',
    onDelete: 'CASCADE',
    foreignKey: {
      field: 'userId',
      allowNull: false
    }
  });
  
  device.belongsToMany(book, {
    as: 'books',
    foreignKey: {
      allowNull: false,
      field: 'deviceId'
    },
    onDelete: 'CASCADE',
    through: 'bookDevice',
  });
};

export { deviceAssociate, deviceInit };