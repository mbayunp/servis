import { Request, Response } from 'express';
import Brand from '../models/brand.model.js';
import DeviceType from '../models/device-type.model.js';
import ServiceCategory from '../models/service-category.model.js';
import Customer from '../models/customer.model.js';
import Booking from '../models/booking.model.js';
import TrackingHistory from '../models/trackingHistory.model.js';
import { Op } from 'sequelize';

export const getMasterData = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.findAll({ order: [['name', 'ASC']] });
    const deviceTypes = await DeviceType.findAll({ order: [['name', 'ASC']] });
    const serviceCategories = await ServiceCategory.findAll({ order: [['name', 'ASC']] });
    
    res.json({
      success: true,
      data: {
        brands,
        deviceTypes,
        serviceCategories
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPublicBooking = async (req: Request, res: Response) => {
  try {
    const { 
      name, whatsapp, email, address, 
      serviceCategoryId, deviceTypeId, brandId, 
      deviceName, serialNumber, accessories, complaint, 
      serviceType, date, time 
    } = req.body;

    if (!name || !whatsapp || !address || !complaint) {
      return res.status(400).json({ success: false, message: 'Harap isi kolom yang wajib.' });
    }

    // 1. Find or create Customer
    let customer = await Customer.findOne({ 
      where: { 
        phoneNumber: whatsapp
      } 
    });

    if (!customer) {
      customer = await Customer.create({
        fullName: name,
        phoneNumber: whatsapp,
        address: address
      });
    }

    // 2. Prepare Booking Data
    const bookingNumber = 'SCJ-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(100 + Math.random()*900);
    const isHomeService = serviceType === 'Home Service';
    
    // Store preferred date and time in notes
    const notes = date && time ? `Jadwal Servis: ${date} jam ${time}` : null;

    // 3. Create Booking
    const booking = await Booking.create({
      bookingNumber,
      customerId: customer.id,
      serviceCategoryId: serviceCategoryId || null,
      deviceTypeId: deviceTypeId || null,
      brandId: brandId || null,
      deviceName: deviceName || null,
      serialNumber: serialNumber || null,
      accessories: accessories || null,
      complaint: complaint,
      isHomeService,
      address, // From customer input
      notes,
      status: 'PENDING',
      priority: 'NORMAL'
    });

    // 4. Create Initial Tracking History
    await TrackingHistory.create({
      bookingId: booking.id,
      status: 'PENDING',
      title: 'Booking Online Dibuat',
      description: 'Pemesanan perbaikan via website telah terdaftar di sistem. Menunggu konfirmasi admin.',
      createdBy: null
    });

    res.status(201).json({ 
      success: true, 
      message: 'Booking berhasil dikirim.', 
      data: {
        bookingNumber: booking.bookingNumber,
        trackingId: booking.id
      }
    });

  } catch (error: any) {
    console.error('Create Public Booking Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
