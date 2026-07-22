import { Request, Response } from 'express';
import Invoice from '../models/invoice.model.js';
import Booking from '../models/booking.model.js';
import Customer from '../models/customer.model.js';
import Payment from '../models/payment.model.js';
import TrackingHistory from '../models/trackingHistory.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Invoice.findAll({
      include: [
        {
          model: Booking,
          as: 'booking',
          include: [{ model: Customer, as: 'customer' }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Invoice.findByPk(req.params.id as string, {
      include: [
        {
          model: Booking,
          as: 'booking',
          include: [{ model: Customer, as: 'customer' }]
        }
      ]
    });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const bookingIdInput = req.body.bookingId || req.body.booking_id;
    if (!bookingIdInput) {
      return res.status(400).json({ success: false, message: 'Booking ID wajib diisi' });
    }

    let booking = await Booking.findByPk(bookingIdInput);
    if (!booking) {
      booking = await Booking.findOne({ where: { bookingNumber: bookingIdInput } });
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking ID tidak ditemukan' });
    }

    const { serviceCost = 0, sparepartCost = 0, discount = 0, tax = 0 } = req.body;
    const subtotal = Number(serviceCost) + Number(sparepartCost);
    const total = subtotal - Number(discount) + Number(tax);
    
    const invoiceNumber = 'INV-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(1000 + Math.random()*9000);
    const data = await Invoice.create({
      ...req.body,
      bookingId: booking.id,
      subtotal,
      total,
      invoiceNumber
    });

    // Synchronize finalCost on Booking model with Invoice total
    await booking.update({ finalCost: total });

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const addPayment = async (req: Request, res: Response) => {
  try {
    const invoiceId = req.params.id as string;
    const invoice = await Invoice.findByPk(invoiceId);

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice tidak ditemukan' });
    }

    const { paymentMethod = 'Cash', amount, paymentDate, notes } = req.body;
    const paymentAmount = amount !== undefined && amount !== null && amount !== '' ? Number(amount) : Number(invoice.total);
    const date = paymentDate ? new Date(paymentDate) : new Date();
    const paymentNumber = 'PAY-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(1000 + Math.random()*9000);
    const userId = (req as any).user?.id || null;

    // 1. Create Payment record
    const payment = await Payment.create({
      invoiceId: invoice.id,
      paymentNumber,
      paymentMethod,
      amount: paymentAmount,
      paymentDate: date,
      status: 'Paid',
      notes: notes || null,
      createdBy: userId
    });

    // 2. Update Invoice status to Paid
    await invoice.update({ status: 'Paid', updatedBy: userId });

    // 3. Update associated Booking status, paymentStatus & add tracking history
    if (invoice.bookingId) {
      const booking = await Booking.findByPk(invoice.bookingId);
      if (booking) {
        const updateData: any = { paymentStatus: 'PAID' };
        if (!['Finished', 'Picked Up', 'Cancelled'].includes(booking.status)) {
          updateData.status = 'Finished';
        }
        await booking.update(updateData);
        await TrackingHistory.create({
          bookingId: booking.id,
          status: 'FINISHED',
          title: 'Pembayaran Diterima (Lunas)',
          description: `Pembayaran sebesar Rp ${paymentAmount.toLocaleString('id-ID')} via ${paymentMethod} telah diterima.`,
          createdBy: userId
        });
      }
    }

    res.status(201).json({ success: true, data: payment, message: 'Pembayaran berhasil dicatat' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Invoice.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const bookingIdInput = req.body.bookingId || req.body.booking_id;
    let targetBookingId = data.bookingId;

    if (bookingIdInput) {
      let booking = await Booking.findByPk(bookingIdInput);
      if (!booking) {
        booking = await Booking.findOne({ where: { bookingNumber: bookingIdInput } });
      }
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking ID tidak ditemukan' });
      }
      targetBookingId = booking.id;
    }

    const serviceCost = req.body.serviceCost !== undefined ? req.body.serviceCost : data.serviceCost;
    const sparepartCost = req.body.sparepartCost !== undefined ? req.body.sparepartCost : data.sparepartCost;
    const discount = req.body.discount !== undefined ? req.body.discount : data.discount;
    const tax = req.body.tax !== undefined ? req.body.tax : data.tax;

    const subtotal = Number(serviceCost) + Number(sparepartCost);
    const total = subtotal - Number(discount) + Number(tax);

    await data.update({
      ...req.body,
      bookingId: targetBookingId,
      subtotal,
      total
    });

    if (targetBookingId) {
      const booking = await Booking.findByPk(targetBookingId);
      if (booking) {
        await booking.update({ finalCost: total });
      }
    }

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await Invoice.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
