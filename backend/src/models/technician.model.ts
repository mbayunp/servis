import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Technician extends Model {
  public id!: string;
  public employeeCode!: string | null;
  public name!: string;
  public photo!: string | null;
  public phone!: string | null;
  public email!: string | null;
  public address!: string | null;
  public skill!: string | null;
  public experience!: number | null; // in years
  public joinDate!: Date | null;
  public status!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Technician.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    employeeCode: { type: DataTypes.STRING, allowNull: true, unique: true, field: 'employee_code' },
    name: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    skill: { type: DataTypes.STRING, allowNull: true }, // comma separated or JSON string
    experience: { type: DataTypes.INTEGER, allowNull: true },
    joinDate: { type: DataTypes.DATE, allowNull: true, field: 'join_date' },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'AVAILABLE' }, // AVAILABLE, ON_DUTY, OFF
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
  },
  { sequelize, tableName: 'technicians', freezeTableName: true, timestamps: true, paranoid: true }
);

export default Technician;
