import mongoose from 'mongoose';

const documentInformationSchema = new mongoose.Schema({
  doc_name: { type: String, required: true },
  doc_address: { type: String, default: null },
  doc_city: { type: String, default: '' },
  doc_country: { type: String, default: null },
  doc_phone1: { type: String, default: null },
  doc_phone2: { type: String, default: null },
  doc_phone3: { type: String, default: null },
  doc_faxno: { type: String, default: null },
  cellphone_no_email: { type: String, default: null },
  tracking_no: { type: String, default: null },
  docCenter_name: { type: String, default: null },
  docCenter_address: { type: String, default: null },
  docCenter_city: { type: String, default: null },
  docCenter_country: { type: String, default: null },
  docCenter_phone1: { type: String, default: null },
  docCenter_phone2: { type: String, default: null },
  docCenter_phone3: { type: String, default: null },
  email: { type: String, default: null },
  url: { type: String, default: null },
  other_information: { type: String, default: null },
  cap_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cap', required: true }
}, {
  timestamps: true
});

const DocumentInformation = mongoose.model('DocumentInformation', documentInformationSchema);

export default DocumentInformation;
