import mongoose, { Schema, Document, models, model } from 'mongoose';



const runeSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  divisibility: { type: Number, required: true },
  symbol: { type: String, required: false },
}, { _id: false });



const statusSchema = new Schema({
  confirmed: { type: Boolean, required: true },
  block_height: { type: Number, required: false },
  block_hash: { type: String, required: false },
  block_time: { type: Number, required: false },
}, { _id: false });

// Define the UTXO interface and schema


const utxoSchema = new Schema({
  txid: { type: String, required: true },
  vout: { type: Number, required: true },
  utxo_id: { type: String, required: true }, //, unique: true
  address: { type: String, required: true },
  status: { type: statusSchema, required: true },
  value: { type: Number, required: true },
  runes: { type: [runeSchema], default: [] },
  listed: {
    type: Boolean,
    validate: {
      validator: function (this: any, value: boolean) {
        return (
          !value ||
          (value &&
            this.listed_at &&
            this.listed_price &&
            this.listed_maker_fee_bp &&
            this.tap_internal_key &&
            this.listed_seller_receive_address &&
            this.signed_psbt &&
            this.unsigned_psbt)
        );
      },
      message:
        'If "listed" is true, all related "listed_" fields must also be provided.',
    },
  },
  listed_at: { type: Date },
  listed_price: { type: Number }, // in sats
  listed_price_per_token: { type: Number }, 
  listed_maker_fee_bp: { type: Number },
  listed_seller_receive_address: { type: String },
  signed_psbt: { type: String },
  unsigned_psbt: { type: String },
});

const RuneUtxo = models.Utxo || model('Utxo', utxoSchema);

export default RuneUtxo;
