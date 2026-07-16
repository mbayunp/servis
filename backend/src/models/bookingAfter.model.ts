import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class BookingAfter extends Model {
  public id!: string;
  public bookingId!: string;
  public photoUrl!: string;
}

BookingAfter.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    bookingId: { type: DataTypes.UUID, allowNull: false, field: 'booking_id' },
    photoUrl: { type: DataTypes.STRING, allowNull: false, field: 'photo_url' },
  },
  { sequelize, tableName: 'booking_afters', freezeTableName: true, timestamps: true }
);

export default BookingAfter;
