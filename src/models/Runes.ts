import mongoose, { Schema, Document } from 'mongoose';

// Define the Rune interface and schema
interface IRune extends Document {
  name: string;
  amount: number;
}

const runeSchema = new Schema<IRune>({
  name: { type: String, required: true },
  amount: { type: Number, required: true }
}, { _id: false });

// Define the Status interface and schema
interface IStatus extends Document {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

const statusSchema = new Schema<IStatus>({
  confirmed: { type: Boolean, required: true },
  block_height: { type: Number, required: true },
  block_hash: { type: String, required: true },
  block_time: { type: Number, required: true }
}, { _id: false });

// Define the UTXO interface and schema
interface IUTXO extends Document {
  txid: string;
  vout: number;
  status: IStatus;
  value: number;
  runes: IRune[];
}

const utxoSchema = new Schema<IUTXO>({
  txid: { type: String, required: true },
  vout: { type: Number, required: true },
  status: { type: statusSchema, required: true },
  value: { type: Number, required: true },
  runes: { type: [runeSchema], default: [] }
});

// Create the UTXO model
const UtxoModel = mongoose.model<IUTXO>('Utxo', utxoSchema);

export default UtxoModel;
