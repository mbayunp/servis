import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import User from '../user/user.model.js';

export class Technician extends Model {
  public id!: number;
  public userId!: number;
  public fullName!: string;
  public phoneNumber!: string;
  public specialization!: string | null;
  public rating!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Technician.init(
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
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'technicians',
    timestamps: true,
    paranoid: true,
  }
);

export default Technician;
