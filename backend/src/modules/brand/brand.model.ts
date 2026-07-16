import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

export class Brand extends Model {
  public id!: number;
  public name!: string;
  public logo!: string | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Brand.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'brands',
    timestamps: true,
  }
);

export default Brand;
