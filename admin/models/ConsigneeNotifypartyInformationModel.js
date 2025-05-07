import mongoose from 'mongoose';

const consigneeNotifyPartySchema = new mongoose.Schema({
  consignee_name: {
    type: String,
    default: null
  },
  consignee_address: {
    type: String,
    default: null
  },
  consignee_city: {
    type: String,
    default: null
  },
  consignee_country: {
    type: String,
    default: null
  },
  consignee_phone1: {
    type: String,
    default: null
  },
  consignee_phone2: {
    type: String,
    default: null
  },
  consignee_phone3: {
    type: String,
    default: null
  },
  consignee_faxno: {
    type: String,
    default: null
  },
  consignee_phoneno_email: {
    type: String,
    default: null
  },
  notifyParty_name: {
    type: String,
    default: null
  },
  notifyParty_address: {
    type: String,
    default: null
  },
  notifyParty_city: {
    type: String,
    default: null
  },
  notifyParty_country: {
    type: String,
    default: null
  },
  notifyParty_phone1: {
    type: String,
    default: null
  },
  notifyParty_phone2: {
    type: String,
    default: null
  },
  notifyParty_phone3: {
    type: String,
    default: null
  },
  notifyParty_faxno: {
    type: String,
    default: null
  },
  notifyParty_phoneno_email: {
    type: String,
    default: null
  },
  cap_id: {
    type: Number,
    required: true
  }
});

const ConsigneeNotifyParty = mongoose.model('ConsigneeNotifyParty', consigneeNotifyPartySchema);

export default ConsigneeNotifyParty;
