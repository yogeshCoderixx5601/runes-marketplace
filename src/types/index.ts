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

export interface IListingState {
  seller: {
    makerFeeBp: number;
    sellerOrdAddress: string;
    price: number;
    ordItem: any;
    sellerReceiveAddress: string;
    unsignedListingPSBTBase64?: string;
    signedListingPSBTBase64?: string;
    tapInternalKey?: string;
  };

  buyer: {
    takerFeeBp: number;
    buyerAddress: string;
    buyerTokenReceiveAddress: string;
    fee_rate: number;
    buyerPublicKey: string;
    unsignedBuyingPSBTBase64?: string;
    unsignedBuyingPSBTInputSize?: number;
    signedBuyingPSBTBase64?: string;
    buyerDummyUTXOs?: UTXO[];
    buyerPaymentUTXOs?: AddressTxsUtxo[]; // after the selection
    mergedSignedBuyingPSBTBase64?: string;
  };
}