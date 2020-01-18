import Sequelize, { Model, DataTypes } from 'sequelize';
import book from './book';

export default class user extends Model<user> {
  id: number;
  name: string;
  email: string;
  password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  
  getBooks: Sequelize.HasManyGetAssociationsMixin<book>;
  setBooks: Sequelize.HasManySetAssociationsMixin<book, book['id']>;
  addBooks: Sequelize.HasManyAddAssociationsMixin<book, book['id']>;
  addBook: Sequelize.HasManyAddAssociationMixin<book, book['id']>;
  createBook: Sequelize.HasManyCreateAssociationMixin<book>;
  removeBook: Sequelize.HasManyRemoveAssociationsMixin<book, book['id']>;
  removeBooks: Sequelize.HasManyRemoveAssociationsMixin<book, book['id']>;
  haBooks: Sequelize.HasManyHasAssociationMixin<book, book['id']>;
  hasBooks: Sequelize.HasManyHasAssociationsMixin<book, book['id']>;
  countBooks: Sequelize.HasManyCountAssociationsMixin;
  
  getDevices: Sequelize.HasManyGetAssociationsMixin<book>;
  setDevices: Sequelize.HasManySetAssociationsMixin<book, book['id']>;
  addDevices: Sequelize.HasManyAddAssociationsMixin<book, book['id']>;
  addDevice: Sequelize.HasManyAddAssociationMixin<book, book['id']>;
  createDevice: Sequelize.HasManyCreateAssociationMixin<book>;
  removeDevice: Sequelize.HasManyRemoveAssociationsMixin<book, book['id']>;
  removeDevices: Sequelize.HasManyRemoveAssociationsMixin<book, book['id']>;
  hasDevice: Sequelize.HasManyHasAssociationMixin<book, book['id']>;
  hasDevices: Sequelize.HasManyHasAssociationsMixin<book, book['id']>;
  countDevices: Sequelize.HasManyCountAssociationsMixin;
}

const userInit = (sequelize) => {
  user.init({
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
      // unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'users',
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { exclude: [] },
      },
    },
  });
};

const userAssociate = ({ book, device }) => {
  user.hasMany(book, {
    as: 'books',
    onDelete: 'CASCADE',
  });
  
  user.hasMany(device, {
    foreignKey: {
      field: 'userId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
    as: 'devices',
  });
};

export { userAssociate, userInit };