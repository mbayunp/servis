import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Article extends Model {
  public id!: string;
  public title!: string;
  public slug!: string;
  public image!: string | null;
  public excerpt!: string | null;
  public content!: string;
  public category!: string | null;
  public status!: string;
  public author!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: { type: DataTypes.STRING, allowNull: true },
    excerpt: { type: DataTypes.TEXT, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'DRAFT' },
    author: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: 'articles', freezeTableName: true, timestamps: true }
);

export default Article;
