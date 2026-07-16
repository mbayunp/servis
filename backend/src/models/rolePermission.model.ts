import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class RolePermission extends Model {
  public roleId!: string;
  public permissionId!: string;
}

RolePermission.init(
  {
    roleId: { type: DataTypes.UUID, primaryKey: true },
    permissionId: { type: DataTypes.UUID, primaryKey: true },
  },
  { sequelize, tableName: 'role_permissions', freezeTableName: true, timestamps: false }
);

export default RolePermission;
