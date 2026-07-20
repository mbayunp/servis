import sequelize from './src/config/database.js';

async function fixSchema() {
  try {
    console.log('Running database schema fix for physical MySQL tables...');

    // 1. Drop FK constraint on customers if exists
    try {
      await sequelize.query('ALTER TABLE `customers` DROP FOREIGN KEY `customers_ibfk_1`');
      console.log('Dropped customers_ibfk_1 foreign key.');
    } catch (e: any) {
      console.log('Note (drop FK):', e.message);
    }

    // 2. Drop UNIQUE index on user_id in customers table
    try {
      await sequelize.query('ALTER TABLE `customers` DROP INDEX `user_id`');
      console.log('Dropped user_id unique index from customers.');
    } catch (e: any) {
      console.log('Note (drop index):', e.message);
    }

    try {
      await sequelize.query('ALTER TABLE `customers` DROP INDEX `user_id_2`');
      console.log('Dropped user_id_2 unique index from customers.');
    } catch (e: any) {}

    // 3. Modify user_id column in customers to ALLOW NULL
    await sequelize.query('ALTER TABLE `customers` MODIFY `user_id` CHAR(36) BINARY NULL DEFAULT NULL');
    console.log('Successfully altered customers.user_id to CHAR(36) BINARY NULL.');

    // 4. Modify foreign key columns in bookings to ALLOW NULL
    await sequelize.query('ALTER TABLE `bookings` MODIFY `brand_id` CHAR(36) BINARY NULL DEFAULT NULL');
    await sequelize.query('ALTER TABLE `bookings` MODIFY `device_type_id` CHAR(36) BINARY NULL DEFAULT NULL');
    await sequelize.query('ALTER TABLE `bookings` MODIFY `service_category_id` CHAR(36) BINARY NULL DEFAULT NULL');
    await sequelize.query('ALTER TABLE `bookings` MODIFY `technician_id` CHAR(36) BINARY NULL DEFAULT NULL');
    console.log('Successfully altered bookings FK columns to ALLOW NULL.');

    // 5. Re-add FK constraint as NULLABLE (ON DELETE SET NULL)
    try {
      await sequelize.query('ALTER TABLE `customers` ADD CONSTRAINT `customers_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE');
      console.log('Re-added customers_user_id_fk with ON DELETE SET NULL.');
    } catch (e: any) {
      console.log('Note (add FK):', e.message);
    }

    console.log('Schema fix completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('Schema fix failed:', error);
    process.exit(1);
  }
}

fixSchema();
