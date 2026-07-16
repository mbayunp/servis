import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

export class DeviceType extends Model {
  public id!: number;
  public name!: string;
  public icon!: string | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DeviceType.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'device_types',
    timestamps: true,
  }
);

export default DeviceType;
