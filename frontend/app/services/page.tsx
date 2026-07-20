import React from 'react';
import ServicesClient from './ServicesClient';

export const metadata = {
  title: 'Layanan Service - Service Cianjur',
  description: 'Layanan perbaikan TV, Mesin Cuci, Kulkas, AC, dan elektronik rumah tangga lainnya di Cianjur. Melayani panggilan ke rumah.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}