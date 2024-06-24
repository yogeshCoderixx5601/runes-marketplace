import * as bitcoin from "bitcoinjs-lib";

export interface IUser {
    ordinal_address: string |null;
    cardinal_address: string |null;
    ordinal_pubkey: string |null;
    cardinal_pubkey: string |null;
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
    utxo: string,
    cardinal_address: string,
    rune_name: string,
    rune_amount: string
    spent: boolean
  }