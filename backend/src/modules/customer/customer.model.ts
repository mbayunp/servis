import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import User from '../user/user.model.js';

export class Customer extends Model {
  public id!: number;
  public userId!: number;
  public fullName!: string;
  public phoneNumber!: string;
  public address!: string | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Customer.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true,
    paranoid: true,
  }
);

export default Customer;
