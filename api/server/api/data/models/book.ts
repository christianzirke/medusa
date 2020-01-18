import { Model, DataTypes } from 'sequelize';

export default class Book extends Model<Book> {
  id: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const init = (sequelize) => {
  Book.init({
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
    paranoid: true,
  });
};

const associate = ({ Device, User }) => {
  Book.belongsTo(User, {
    as: 'user',
    foreignKey: {
      field: 'userId',
      allowNull: false,
    },
  });
  
  Book.belongsToMany(Device, {
    as: 'devices',
    foreignKey: {
      allowNull: false,
      field: 'bookId',
    },
    through: 'BookDevice',
  });
};

export { associate, init };