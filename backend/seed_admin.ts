import 'dotenv/config';
import bcrypt from 'bcrypt';
import User from './src/models/user.model.js';
import Role from './src/models/role.model.js';
import sequelize from './src/config/database.js';

async function seedAdmin() {
  try {
    await sequelize.sync(); // ensure DB is connected
    
    const [role] = await Role.findOrCreate({
      where: { name: 'SUPER_ADMIN' },
      defaults: {
        name: 'SUPER_ADMIN',
        description: 'Super Admin'
      }
    });

    const roleId = role.getDataValue('id');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const [user, created] = await User.findOrCreate({
      where: { email: 'admin@serviscianjur.com' },
      defaults: {
        name: 'Admin QA',
        username: 'admin_qa',
        email: 'admin@serviscianjur.com',
        password: hashedPassword,
        roleId: roleId,
        status: 'ACTIVE'
      }
    });
    if (!created) {
      await user.update({ password: hashedPassword, roleId: roleId, username: 'admin_qa' });
    }
    console.log('Admin user created/updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin:', error);
    process.exit(1);
  }
}

seedAdmin();

seedAdmin();
