import React from 'react';
import {
  FaTv,
  FaSnowflake,
  FaWrench,
  FaCheckCircle,
  FaHistory,
  FaUserTie,
  FaHome,
  FaShieldAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaClipboardList,
  FaTruck,
  FaHandshake,
  FaTools,
  FaQuoteLeft
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService } from "react-icons/md";

export function getIconComponent(iconName: string): React.ReactNode {
  switch (iconName) {
    case 'FaTv': return <FaTv />;
    case 'FaSnowflake': return <FaSnowflake />;
    case 'FaWrench': return <FaWrench />;
    case 'FaCheckCircle': return <FaCheckCircle />;
    case 'FaHistory': return <FaHistory />;
    case 'FaUserTie': return <FaUserTie />;
    case 'FaHome': return <FaHome />;
    case 'FaShieldAlt': return <FaShieldAlt />;
    case 'FaWhatsapp': return <FaWhatsapp />;
    case 'FaEnvelope': return <FaEnvelope />;
    case 'FaMapMarkerAlt': return <FaMapMarkerAlt />;
    case 'FaClock': return <FaClock />;
    case 'FaArrowRight': return <FaArrowRight />;
    case 'FaClipboardList': return <FaClipboardList />;
    case 'FaTruck': return <FaTruck />;
    case 'FaHandshake': return <FaHandshake />;
    case 'FaTools': return <FaTools />;
    case 'FaQuoteLeft': return <FaQuoteLeft />;
    case 'MdOutlineLocalLaundryService': return <MdOutlineLocalLaundryService />;
    default: return <FaWrench />;
  }
}
