import mongoose from 'mongoose';

const adminLoginSchema = new mongoose.Schema({
  _id : {
    type: String,
    reuired: true,
  },
  username: {
    type: String,
    required: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, {versionKey : false });

const AdminLogin = mongoose.model('Admin_Login', adminLoginSchema , "admin_login");

export default AdminLogin;
