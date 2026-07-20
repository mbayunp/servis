import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Setting extends Model {
  public id!: string;
  public key!: string;
  public value!: string | null;
  public group!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Setting.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    key: { type: DataTypes.STRING, allowNull: false, unique: true },
    value: { type: DataTypes.TEXT, allowNull: true },
    group: { type: DataTypes.STRING, allowNull: false, defaultValue: 'general' },
  },
  { sequelize, tableName: 'settings', freezeTableName: true, timestamps: true }
);

export default Setting;
