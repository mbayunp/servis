import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class DeviceType extends Model {
  public id!: string;
  public name!: string;
  public icon!: string | null;
  public description!: string | null;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

DeviceType.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    icon: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE' },
  },
  { sequelize, tableName: 'device_types', freezeTableName: true, timestamps: true, paranoid: true }
);

export default DeviceType;
