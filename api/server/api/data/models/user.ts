import { Model, DataTypes } from 'sequelize';
import book from './book';

export default class user extends Model<user> {
  id: number;
  name: string;
  email: string;
  password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  
  createBook: (book: book) => Promise<book>
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