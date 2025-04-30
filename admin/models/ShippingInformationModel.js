import mongoose from 'mongoose';

// Shipping Information Schema
const shippingInformationSchema = new mongoose.Schema({
  carrier: {
    type: String,
    default: null
  },
  dep_vessel_name: {
    type: String,
    default: null
  },
  port_of_loading: {
    type: String,
    default: null
  },
  etd: {
    type: Date,
    default: null
  },
  arrive_vessel_name: {
    type: String,
    default: null
  },
  port_of_discharge: {
    type: String,
    default: null
  },
  eta: {
    type: Date,
    default: null
  },
  bl: {
    type: String,
    default: null
  },
  inspection: {
    type: String,
    default: null
  },
  export_certificate: {
    type: String,
    default: null
  },
  english_export_certificate: {
    type: String,
    default: null
  },
  invoice: {
    type: String,
    default: null
  },
  enrollment: {
    type: String,
    default: null
  },
  cap_id: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const ShippingInformation = mongoose.model('ShippingInformation', shippingInformationSchema);

export default ShippingInformation;
