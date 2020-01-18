import Sequelize, { Model, DataTypes } from 'sequelize';
import user from './user';
import device from './device';

export default class book extends Model<book> {
  id: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  
  getDevices: Sequelize.BelongsToManyGetAssociationsMixin<device>;
  setDevices: Sequelize.BelongsToManySetAssociationsMixin<device, device['id']>;
  addDevices: Sequelize.BelongsToManyAddAssociationsMixin<device, device['id']>;
  addDevice: Sequelize.BelongsToManyAddAssociationMixin<device, device['id']>;
  createDevice: Sequelize.BelongsToManyCreateAssociationMixin<device['id']>;
  removeDevice: Sequelize.BelongsToManyRemoveAssociationMixin<device, device['id']>;
  removeDevices: Sequelize.BelongsToManyRemoveAssociationsMixin<device, device['id']>;
  hasDevice: Sequelize.BelongsToManyHasAssociationMixin<device, device['id']>;
  hastDevices: Sequelize.BelongsToManyHasAssociationsMixin<device, device['id']>;
  countDevices: Sequelize.BelongsToManyCountAssociationsMixin;
  
  getUser: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser: Sequelize.BelongsToSetAssociationMixin<user, user['id']>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<user>;
}

const bookInit = (sequelize) => {
  book.init({
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
  });
};

const bookAssociate = ({ device, user }) => {
  book.belongsTo(user, {
    as: 'user',
    foreignKey: {
      field: 'userId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  
  book.belongsToMany(device, {
    as: 'devices',
    foreignKey: {
      allowNull: false,
      field: 'bookId',
    },
    onDelete: 'CASCADE',
    through: 'bookDevice',
  });
};

export { bookAssociate, bookInit };