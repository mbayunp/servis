import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Role from './role.model.js';

export class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public phone!: string | null;
  public address!: string | null;
  public avatar!: string | null;
  public roleId!: string;
  public status!: string;
  public lastLogin!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
  
  public role?: Role; // Virtual field for association
}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    roleId: { type: DataTypes.UUID, allowNull: false, field: 'role_id' },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE' },
    lastLogin: { type: DataTypes.DATE, allowNull: true, field: 'last_login' },
  },
  { sequelize, tableName: 'users', freezeTableName: true, timestamps: true, paranoid: true }
);

export default User;
