import Role from '../modules/role/role.model.js';
import User from '../modules/user/user.model.js';
import Customer from '../modules/customer/customer.model.js';
import Technician from '../modules/technician/technician.model.js';
import DeviceType from '../modules/device-type/device-type.model.js';
import Brand from '../modules/brand/brand.model.js';

export const setupAssociations = () => {
  // User & Role
  Role.hasMany(User, { foreignKey: 'roleId' });
  User.belongsTo(Role, { foreignKey: 'roleId' });

  // User & Customer (1 to 1)
  User.hasOne(Customer, { foreignKey: 'userId' });
  Customer.belongsTo(User, { foreignKey: 'userId' });

  // User & Technician (1 to 1)
  User.hasOne(Technician, { foreignKey: 'userId' });
  Technician.belongsTo(User, { foreignKey: 'userId' });
  
  // Note: DeviceType and Brand associations will be added later when Service/Booking models are created
};

export {
  Role,
  User,
  Customer,
  Technician,
  DeviceType,
  Brand,
};
