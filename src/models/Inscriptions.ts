const mongoose = require('mongoose');

export const inscriptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  inscription_id: { type: String, required: true },
  outpoint: { type: String, required: true },
  seller_address: { type: String, required: true },
  buyer_address: { type: String, default: null },
  satoshi_price: { type: Number, required: true },
  creator_address: { type: String, default: null },
  bought_at: { type: Date, default: null },
  created: { type: Date, required: true },
  price_per: { type: String, default: '' },
  amount: { type: String, default: '' },
}, {
  timestamps: true,
});

