import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class ServiceCategory extends Model {
  public id!: string;
  public name!: string;
  public description!: string | null;
  public estimatedDuration!: number | null; // in minutes
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

ServiceCategory.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    estimatedDuration: { type: DataTypes.INTEGER, allowNull: true, field: 'estimated_duration' },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE' },
  },
  { sequelize, tableName: 'service_categories', freezeTableName: true, timestamps: true, paranoid: true }
);

export default ServiceCategory;
