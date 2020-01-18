import Sequelize, { Model, DataTypes } from 'sequelize';
import book from './book';
import user from './user';

export default class device extends Model<device> {
  id: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  
  getBooks: Sequelize.BelongsToManyGetAssociationsMixin<book>;
  setBooks: Sequelize.BelongsToManySetAssociationsMixin<book, book['id']>;
  addBooks: Sequelize.BelongsToManyAddAssociationsMixin<book, book['id']>;
  addBook: Sequelize.BelongsToManyAddAssociationMixin<book, book['id']>;
  createBook: Sequelize.BelongsToManyCreateAssociationMixin<book['id']>;
  removeBook: Sequelize.BelongsToManyRemoveAssociationMixin<book, book['id']>;
  removeBooks: Sequelize.BelongsToManyRemoveAssociationsMixin<book, book['id']>;
  hasBook: Sequelize.BelongsToManyHasAssociationMixin<book, book['id']>;
  hastBooks: Sequelize.BelongsToManyHasAssociationsMixin<book, book['id']>;
  countBooks: Sequelize.BelongsToManyCountAssociationsMixin;
  
  getUser: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser: Sequelize.BelongsToSetAssociationMixin<user, user['id']>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<user>;
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
      allowNull: false,
    },
  });
  
  device.belongsToMany(book, {
    as: 'books',
    foreignKey: {
      allowNull: false,
      field: 'deviceId',
    },
    onDelete: 'CASCADE',
    through: 'bookDevice',
  });
};

export { deviceAssociate, deviceInit };