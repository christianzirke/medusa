import { Model, DataTypes } from 'sequelize';

export default class book extends Model<book> {
  id: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
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