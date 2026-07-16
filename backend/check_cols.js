import sequelize from './src/config/database.js';

const checkColumns = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE, COLLATION_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'servis_cianjur' AND COLUMN_NAME = 'id';
    `);
    console.table(results);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkColumns();
