import { AddressTxsUtxo, IRune, RuneDetails } from "@/types";
import axios from "axios";
// import { address } from "bitcoinjs-lib";

export async function getRunes(payment_address: string) {
  let allUtxos: AddressTxsUtxo[];
  let runesUtxos: AddressTxsUtxo[] | undefined;
  
  try {
    allUtxos = await getUtxosByAddress(payment_address);
  } catch (e) {
    console.error(e);
    throw new Error("Mempool error");
  }

  try {
    runesUtxos = await selectRunesUTXOs(allUtxos,payment_address);
    return runesUtxos
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getUtxosByAddress(address: string): Promise<AddressTxsUtxo[]> {
  const url =
    process.env.NEXT_PUBLIC_NETWORK === "testnet"
      ? `https://mempool.space/testnet/api/address/${address}/utxo`
      : `https://mempool-api.ordinalnovus.com/address/${address}/utxo`;
  
  const { data } = await axios.get(url);
  return data;
}

export async function selectRunesUTXOs(utxos: AddressTxsUtxo[],payment_address: string): Promise<AddressTxsUtxo[]> {
  const selectedUtxos: any = [];
  console.log(payment_address,"---------------payment_address")
  // Sort descending by value, and filter out dummy UTXOs
  utxos = utxos.sort((a, b) => b.value - a.value);
  
  for (const utxo of utxos) {
    const rune = await doesUtxoContainRunes(utxo);
    if (rune) {
      utxo.rune = rune
      utxo.utxo_id = `${utxo.txid}:${utxo.vout}`;
      utxo.address = `${payment_address}`
      selectedUtxos.push(utxo);
    }
  }

  return selectedUtxos;
}

export async function doesUtxoContainRunes(utxo: AddressTxsUtxo): Promise<any> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_NETWORK?.includes("testnet")
      ? "http://192.168.1.17:8080/"
      : `${process.env.NEXT_PUBLIC_PROVIDER}/`;
    
    if (!apiUrl) {
      console.warn("API provider URL is not defined in environment variables");
      return undefined;
    }

    const url = `${apiUrl}output/${utxo.txid}:${utxo.vout}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    
    console.log( response.data, "RUNES RESPONSE FROM ORD SERVER")
    if (Array.isArray(response.data.runes) && response.data.runes.length > 0) {
      console.log("Runes data found:", response.data.runes);
      return response.data.runes;
    } else {
      console.log("No runes data found or it is empty.");
      return false;
    }
  } catch (error) {
    console.error("Error in doesUtxoContainRunes:", error);
    return true;
  }
}

export const extractNameAndAmount = (rune: AddressTxsUtxo | null | undefined) => {
  if (!rune) {
    return []; // Return an empty array if rune is null or undefined
  }
  
  const entries = Object.entries(rune);
  const result = entries.map(([name, details]) => ({
    name,
    amount: details.amount
  }));
  
  return result;
};

export const aggregateRuneAmounts = (runesUtxos: AddressTxsUtxo[]) => {
  const runeMap = new Map<string, number>();

  for (const runesUtxo of runesUtxos) {
    const rune = runesUtxo.rune; // Assuming runesUtxo is an AddressTxsUtxo object
    console.log(rune,"------------rune in utils")
    const runeDetails = extractNameAndAmount(rune);

    for (const { name, amount } of runeDetails) {
      if (runeMap.has(name)) {
        runeMap.set(name, runeMap.get(name)! + amount);
      } else {
        runeMap.set(name, amount);
      }
    }
  }

  // Convert the Map to an array of objects
  const result = Array.from(runeMap, ([name, amount]) => ({ name, amount }));
  
  return result;
};



// async function mapUtxos(utxosFromMempool: AddressTxsUtxo[]): Promise<UTXO[]> {
//   const ret: UTXO[] = [];
//   for (const utxoFromMempool of utxosFromMempool) {
//     const txHex = await getTxHexById(utxoFromMempool.txid);
//     ret.push({
//       txid: utxoFromMempool.txid,
//       vout: utxoFromMempool.vout,
//       value: utxoFromMempool.value,
//       status: utxoFromMempool.status,
//       tx: bitcoin.Transaction.fromHex(txHex),
//     });
//   }
//   return ret;
// }

// async function getTxHexById(txId: string): Promise<string> {
//   // if (!txHexByIdCache[txId]) {
//   const url =
//     process.env.NEXT_PUBLIC_NETWORK === "testnet"
//       ? `https://mempool.space/testnet/api/tx/${txId}/hex`
//       : `https://mempool-api.ordinalnovus.com/tx/${txId}/hex`;
//   return await fetch(url).then((response) => response.text());
//   // }
// }

// const mempoolNetwork = () =>
//   process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? "" : "testnet/";
