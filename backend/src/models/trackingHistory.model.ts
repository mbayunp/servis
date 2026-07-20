import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class TrackingHistory extends Model {
  public id!: string;
  public bookingId!: string;
  public status!: string;
  public title!: string;
  public description!: string | null;
  public createdBy!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TrackingHistory.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    bookingId: { type: DataTypes.UUID, allowNull: false, field: 'booking_id' },
    status: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    createdBy: { type: DataTypes.UUID, allowNull: true, field: 'created_by' },
  },
  { sequelize, tableName: 'tracking_histories', freezeTableName: true, timestamps: true }
);

export default TrackingHistory;
