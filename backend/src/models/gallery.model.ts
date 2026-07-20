import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Gallery extends Model {
  public id!: string;
  public title!: string;
  public imageUrl!: string;
  public category!: string | null;
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Gallery.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false, field: 'image_url' },
    category: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: 'galleries', freezeTableName: true, timestamps: true }
);

export default Gallery;
