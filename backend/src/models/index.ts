import Role from './role.model.js';
import Permission from './permission.model.js';
import RolePermission from './rolePermission.model.js';
import User from './user.model.js';
import Brand from './brand.model.js';
import DeviceType from './device-type.model.js';
import ServiceCategory from './service-category.model.js';
import Technician from './technician.model.js';
import Customer from './customer.model.js';
import Booking from './booking.model.js';
import BookingBefore from './bookingBefore.model.js';
import BookingAfter from './bookingAfter.model.js';
import TrackingHistory from './trackingHistory.model.js';

import Invoice from './invoice.model.js';
import Payment from './payment.model.js';

export const setupAssociations = () => {
  // Booking -> TrackingHistory
  Booking.hasMany(TrackingHistory, { foreignKey: 'bookingId', as: 'histories' });
  TrackingHistory.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

  // Booking -> Invoice
  Booking.hasMany(Invoice, { foreignKey: 'bookingId', as: 'invoices' });
  Invoice.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

  // Invoice -> Payment
  Invoice.hasMany(Payment, { foreignKey: 'invoiceId', as: 'payments' });
  Payment.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
  // Role & Permission (Many to Many)
  Role.belongsToMany(Permission, { through: RolePermission, as: 'permissions', foreignKey: 'roleId', otherKey: 'permissionId' });
  Permission.belongsToMany(Role, { through: RolePermission, as: 'roles', foreignKey: 'permissionId', otherKey: 'roleId' });

  // User & Role (Many to One)
  Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });
  User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

  // Customer & User
  User.hasOne(Customer, { foreignKey: 'userId', as: 'customerProfile' });
  Customer.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // Booking & Customer
  Customer.hasMany(Booking, { foreignKey: 'customerId', as: 'bookings' });
  Booking.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

  // Booking & Technician
  Technician.hasMany(Booking, { foreignKey: 'technicianId', as: 'bookings' });
  Booking.belongsTo(Technician, { foreignKey: 'technicianId', as: 'technician' });

  // Booking & Master Data
  Brand.hasMany(Booking, { foreignKey: 'brandId' });
  Booking.belongsTo(Brand, { foreignKey: 'brandId', as: 'brand' });

  DeviceType.hasMany(Booking, { foreignKey: 'deviceTypeId' });
  Booking.belongsTo(DeviceType, { foreignKey: 'deviceTypeId', as: 'deviceType' });

  ServiceCategory.hasMany(Booking, { foreignKey: 'serviceCategoryId' });
  Booking.belongsTo(ServiceCategory, { foreignKey: 'serviceCategoryId', as: 'serviceCategory' });

  // Booking & Photos
  Booking.hasMany(BookingBefore, { foreignKey: 'bookingId', as: 'beforePhotos' });
  BookingBefore.belongsTo(Booking, { foreignKey: 'bookingId' });

  Booking.hasMany(BookingAfter, { foreignKey: 'bookingId', as: 'afterPhotos' });
  BookingAfter.belongsTo(Booking, { foreignKey: 'bookingId' });
};

export {
  Role,
  Permission,
  RolePermission,
  User,
  Brand,
  DeviceType,
  ServiceCategory,
  Technician,
  Customer,
  Booking,
  BookingBefore,
  BookingAfter,
  TrackingHistory
};
