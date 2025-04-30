import mongoose from 'mongoose';

// Product Images Schema
const productImageSchema = new mongoose.Schema({
  img_url: {
    type: String,
    required: true
  },
  productID: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const ProductImage = mongoose.model('ProductImage', productImageSchema);

export default ProductImage;
