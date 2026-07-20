import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Testimonial extends Model {
  public id!: string;
  public customerName!: string;
  public customerPhoto!: string | null;
  public rating!: number;
  public comment!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Testimonial.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    customerName: { type: DataTypes.STRING, allowNull: false, field: 'customer_name' },
    customerPhoto: { type: DataTypes.STRING, allowNull: true, field: 'customer_photo' },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
    comment: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'APPROVED' },
  },
  { sequelize, tableName: 'testimonials', freezeTableName: true, timestamps: true }
);

export default Testimonial;
