import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Booking extends Model {
  public id!: string;
  public bookingNumber!: string;
  public customerId!: string;
  public technicianId!: string | null;
  public brandId!: string;
  public deviceTypeId!: string;
  public serviceCategoryId!: string;
  public deviceName!: string | null;
  public serialNumber!: string | null;
  public complaint!: string;
  public diagnosis!: string | null;
  public solution!: string | null;
  public estimatedCost!: number | null;
  public finalCost!: number | null;
  public estimatedFinish!: Date | null;
  public priority!: string;
  public status!: string;
  public warrantyDays!: number | null;
  public isHomeService!: boolean;
  public address!: string | null;
  public latitude!: string | null;
  public longitude!: string | null;
  public notes!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Booking.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    bookingNumber: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'booking_number' },
    customerId: { type: DataTypes.UUID, allowNull: false, field: 'customer_id' },
    technicianId: { type: DataTypes.UUID, allowNull: true, field: 'technician_id' },
    brandId: { type: DataTypes.UUID, allowNull: true, field: 'brand_id' },
    deviceTypeId: { type: DataTypes.UUID, allowNull: true, field: 'device_type_id' },
    serviceCategoryId: { type: DataTypes.UUID, allowNull: true, field: 'service_category_id' },
    deviceName: { type: DataTypes.STRING, allowNull: true, field: 'device_name' },
    serialNumber: { type: DataTypes.STRING, allowNull: true, field: 'serial_number' },
    complaint: { type: DataTypes.TEXT, allowNull: false },
    diagnosis: { type: DataTypes.TEXT, allowNull: true },
    solution: { type: DataTypes.TEXT, allowNull: true },
    estimatedCost: { type: DataTypes.DECIMAL(10, 2), allowNull: true, field: 'estimated_cost' },
    finalCost: { type: DataTypes.DECIMAL(10, 2), allowNull: true, field: 'final_cost' },
    estimatedFinish: { type: DataTypes.DATE, allowNull: true, field: 'estimated_finish' },
    priority: { type: DataTypes.STRING, allowNull: false, defaultValue: 'NORMAL' }, // LOW, NORMAL, HIGH, URGENT
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'PENDING' }, // PENDING, VERIFIED, ASSIGNED, ON_PROGRESS, WAITING_APPROVAL, WAITING_SPAREPART, QC, FINISHED, DELIVERED, CANCELLED
    warrantyDays: { type: DataTypes.INTEGER, allowNull: true, field: 'warranty_days' },
    isHomeService: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_home_service' },
    address: { type: DataTypes.TEXT, allowNull: true },
    latitude: { type: DataTypes.STRING, allowNull: true },
    longitude: { type: DataTypes.STRING, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: 'bookings', freezeTableName: true, timestamps: true, paranoid: true }
);

export default Booking;
