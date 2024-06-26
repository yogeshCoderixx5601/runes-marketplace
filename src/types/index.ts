import * as bitcoin from "bitcoinjs-lib";
import { Schema } from "mongoose";

export interface IUser {
  ordinal_address: string | null;
  cardinal_address: string | null;
  ordinal_pubkey: string | null;
  cardinal_pubkey: string | null;
  wallet: string | null;
  connected?: boolean;
}

export interface RuneDetails {
  amount: number;
  divisibility: number;
  symbol: string;
}

export interface IRune {
  [key: number]: RuneDetails;
}

export interface AddressTxsUtxo {
  address: string;
  utxo_id: string;
  rune: any;
  txid: string;
  vout: number;
  status: TxStatus;
  value: number;
}
export interface TxStatus {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}
export interface UTXO {
  status: {
    block_hash: string;
    block_height: number;
    block_time: number;
    confirmed: boolean;
  };
  txid: string;
  value: number;
  vout: number;
  tx: bitcoin.Transaction;
}
export interface UtxoCollection {
  utxo: string;
  cardinal_address: string;
  rune_name: string;
  rune_amount: string;
  spent: boolean;
}

// inscriptions
export interface Holder {
  address: string;
  count: number;
}
// Type aliases for repeated types
type BlockchainType = "btc" | "ltc" | "doge";
type CollectionType = "official" | "list";

export interface ICollectionBase {
  name: string;
  slug: string;
  description: string;
  blockchain: BlockchainType;
  type: CollectionType;
  tags?: string[];
  email?: string;
  discord_id?: string;
  json_uploaded?: boolean;
}

// Interface for adding a new collection
export interface IAddCollection extends ICollectionBase {
  inscription_icon?: string;
  icon?: string;
  supply?: number;
  twitter_link?: string;
  discord_link?: string;
  website_link?: string;
  live: boolean;
  verified: boolean;
  updated_by: string;
}

// Interface for the collection document
export interface ICollection extends ICollectionBase, Document {
  _id: string;
  inscription_icon?: IInscription;
  icon?: string;
  supply?: number;
  twitter_link?: string;
  discord_link?: string;
  website_link?: string;
  live?: boolean;
  featured?: boolean;
  flagged?: boolean;
  banned?: boolean;
  verified?: boolean;
  updated_by?: string;
  favorites: string[];
  updated?: number;
  errored?: number;
  error?: boolean;
  errored_inscriptions: string[];
  error_tag?: string;
  min?: number;
  max?: number;
  priority?: number;
  created_at?: Date;
  updated_at?: Date;
  holders_check?: Date;
  holders: Holder[];
  holders_count: number;
  listed?: number;
  fp?: number;
  royalty_bp?: number;
  royalty_address?: string;
  metaprotocol?: string;
  token_amount?: number;
  volume?: number;
  in_mempool?: number;
}

interface Attribute {
  trait_type: string;
  value: string;
}
export interface ISatCollection {
  _id: string;
  collection_item_name?: string;
  collection_item_number?: number;
  sat: number;
  official_collection: ICollection;
}
export interface IInscription {
  sat_collection?: ISatCollection;
  valid?: boolean;
  reinscriptions?: IInscription[];
  _id: string;
  inscription_number: number;
  inscription_id: string;
  content?: string;
  sha?: string;
  location?: string;
  output?: string;
  timestamp?: Date;
  children?: any[];
  next?: string;
  previous?: string;
  parent?: string;
  genesis_address?: string;
  genesis_fee?: number;
  genesis_height?: number;
  genesis_transaction?: string;
  flagged?: boolean;
  banned: boolean;
  reason?: string;
  updated_by?: string;
  block?: number;
  content_length?: number;
  content_type?: string;
  official_collection?: ICollection;
  collection_item_name?: string;
  collection_item_number?: number;
  attributes?: Attribute[];
  sat_timestamp?: Date;
  cycle?: number;
  decimal?: string;
  degree?: string;
  epoch?: number;
  percentile?: string;
  period?: number;
  rarity?: string;

  sat?: number;
  sat_name?: string;
  sat_offset?: number;
  lists?: Schema.Types.ObjectId[];
  tags?: string[];
  error?: boolean;
  error_retry?: number;
  error_tag?: string;
  offset?: number;
  output_value?: number;
  address?: string;
  listed?: boolean;
  listed_at?: Date;
  listed_price?: number;
  listed_maker_fee_bp?: number;
  tap_internal_key?: string;
  listed_seller_receive_address?: string;
  signed_psbt?: string;
  unsigned_psbt?: string;
  in_mempool: boolean;
  txid: string;
  sat_block_time?: Date;
  sattributes?: string[];
  last_checked?: Date;
  version?: number;
  token?: boolean;
  domain_valid?: boolean;

  // v12.1.3
  metadata?: any;
  metaprotocol?: string;
  parsed_metaprotocol?: string[];
  charms?: number;
  cbrc_valid?: boolean;
  listed_token?: string;
  listed_price_per_token?: number;
  listed_amount?: number;
}
