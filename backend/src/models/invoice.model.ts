import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Invoice extends Model {
  public id!: string;
  public bookingId!: string;
  public invoiceNumber!: string;
  public subtotal!: number;
  public serviceCost!: number;
  public sparepartCost!: number;
  public discount!: number;
  public tax!: number;
  public total!: number;
  public status!: string;
  public notes!: string | null;
  public createdBy!: string | null;
  public updatedBy!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Invoice.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    bookingId: { type: DataTypes.UUID, allowNull: false, field: 'booking_id' },
    invoiceNumber: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'invoice_number' },
    subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    serviceCost: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0, field: 'service_cost' },
    sparepartCost: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0, field: 'sparepart_cost' },
    discount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    tax: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Draft' }, // Draft, Waiting Payment, Partial Paid, Paid, Cancelled
    notes: { type: DataTypes.TEXT, allowNull: true },
    createdBy: { type: DataTypes.UUID, allowNull: true, field: 'created_by' },
    updatedBy: { type: DataTypes.UUID, allowNull: true, field: 'updated_by' }
  },
  { sequelize, tableName: 'invoices', freezeTableName: true, timestamps: true }
);

export default Invoice;
