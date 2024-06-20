// models/Collection.js
const mongoose = require('mongoose');


export const collectionSchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: false },
  icon: { type: String, required: false },
  banner_icon: { type: String, default: null },
  icon_inscription: { type: String, default: null },
  description: { type: String, required: false },
  slug: { type: String, required: false },
  active: { type: Boolean, required: false },
  sponsored_priority: { type: Number, required: false },
  featured_priority: { type: Number, required: false },
  highest_inscription_num: { type: Number, required: false },
  lowest_inscription_num: { type: Number, required: false },
  total_supply: { type: Number, required: false },
  socials: {
    type: Map,
    of: String,
    default: {}
  },
  creator_address: { type: String, default: null },
  floor_price: { type: Number, required: false },
  volume_hour: { type: Number, default: null },
  volume_six_hour: { type: Number, default: null },
  volume_day: { type: Number, default: null },
  volume_week: { type: Number, default: null },
  volume_month: { type: Number, default: null },
  volume_all_time: { type: Number, required: false },
  change_week: { type: Number, default: null },
  price_change_day: { type: Number, default: null },
  listed: { type: Number, required: false },
  owners: { type: Number, required: false },
  mint: { type: String, default: null },
}, {
  timestamps: true, // Automatically includes createdAt and updatedAt fields
});


