// models/Collection.js
const mongoose = require('mongoose');

export const collectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  banner_icon: { type: String, default: null },
  icon_inscription: { type: String, default: null },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  active: { type: Boolean, required: true },
  sponsored_priority: { type: Number, required: true },
  featured_priority: { type: Number, required: true },
  highest_inscription_num: { type: Number, required: true },
  lowest_inscription_num: { type: Number, required: true },
  total_supply: { type: Number, required: true },
  socials: {
    type: Map,
    of: String,
    default: {}
  },
  creator_address: { type: String, default: null },
  floor_price: { type: Number, required: true },
  volume_hour: { type: Number, default: null },
  volume_six_hour: { type: Number, default: null },
  volume_day: { type: Number, default: null },
  volume_week: { type: Number, default: null },
  volume_month: { type: Number, default: null },
  volume_all_time: { type: Number, required: true },
  change_week: { type: Number, default: null },
  price_change_day: { type: Number, default: null },
  listed: { type: Number, required: true },
  owners: { type: Number, required: true },
  mint: { type: String, default: null },
}, {
  timestamps: true, // Automatically includes createdAt and updatedAt fields
});


