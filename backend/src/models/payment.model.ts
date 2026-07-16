import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Payment extends Model {
  public id!: string;
  public invoiceId!: string;
  public paymentNumber!: string;
  public paymentMethod!: string;
  public amount!: number;
  public paymentDate!: Date;
  public status!: string;
  public proofImage!: string | null;
  public notes!: string | null;
  public createdBy!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    invoiceId: { type: DataTypes.UUID, allowNull: false, field: 'invoice_id' },
    paymentNumber: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'payment_number' },
    paymentMethod: { type: DataTypes.STRING, allowNull: false, field: 'payment_method' }, // cash, transfer, qris, ewallet
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    paymentDate: { type: DataTypes.DATE, allowNull: false, field: 'payment_date' },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Pending' }, // Pending, Paid, Failed, Refund
    proofImage: { type: DataTypes.STRING, allowNull: true, field: 'proof_image' },
    notes: { type: DataTypes.TEXT, allowNull: true },
    createdBy: { type: DataTypes.UUID, allowNull: true, field: 'created_by' }
  },
  { sequelize, tableName: 'payments', freezeTableName: true, timestamps: true }
);

export default Payment;
