import sequelize from './src/config/database.js';

async function migrateAccessories() {
  try {
    await sequelize.query(`
      ALTER TABLE bookings ADD COLUMN accessories TEXT NULL;
    `);
    console.log('Successfully added accessories column to bookings table');
  } catch (err: any) {
    if (err.message?.includes('Duplicate column name') || err.original?.code === 'ER_DUP_FIELDNAME') {
      console.log('Column accessories already exists.');
    } else {
      console.error('Error adding accessories column:', err);
    }
  }
  process.exit(0);
}

migrateAccessories();
