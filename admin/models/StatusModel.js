import mongoose from 'mongoose';

// Status Schema
const statusSchema = new mongoose.Schema({
  cap_available: {
    type: Number,
    default: null
  },
  reflect_document: {
    type: Number,
    default: null
  },
  booking_department: {
    type: Number,
    default: null
  },
  uploaded_export: {
    type: Number,
    default: null
  },
  arranging_whole: {
    type: Number,
    default: null
  },
  further_preparation: {
    type: Number,
    default: null
  },
  preshipment_inspection: {
    type: Number,
    default: null
  },
  allocated_a_vessel: {
    type: Number,
    default: null
  },
  reflect_shipping: {
    type: Number,
    default: null
  },
  uploaded_invoice: {
    type: Number,
    default: null
  },
  confirmed_loading: {
    type: Number,
    default: null
  },
  uploaded_bl: {
    type: Number,
    default: null
  },
  proofread_bl: {
    type: Number,
    default: null
  },
  completed_reflect: {
    type: Number,
    default: null
  },
  sent_out_bl: {
    type: Number,
    default: null
  },
  cap_id: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Status = mongoose.model('Status', statusSchema);

export default Status;
