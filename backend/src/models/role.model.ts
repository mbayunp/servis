import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Role extends Model {
  public id!: string;
  public name!: string;
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: 'roles', freezeTableName: true, timestamps: true }
);

export default Role;
