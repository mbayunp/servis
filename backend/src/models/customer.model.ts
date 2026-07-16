import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Customer extends Model {
  public id!: string;
  public userId!: string;
  public fullName!: string;
  public phoneNumber!: string;
  public address!: string | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Customer.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, unique: true, field: 'user_id' },
    fullName: { type: DataTypes.STRING, allowNull: false, field: 'full_name' },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, field: 'phone_number' },
    address: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: 'customers', freezeTableName: true, timestamps: true, paranoid: true }
);

export default Customer;
