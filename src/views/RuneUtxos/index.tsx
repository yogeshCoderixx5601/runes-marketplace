"use client"
import { getRuneUtxos } from "@/apiHelper/getRuneUtxos";
import { RootState } from "@/stores";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWalletAddress,useSignTx } from "bitcoin-wallet-adapter";
import { listPsbt } from "@/apiHelper/listPsbt";

const RuneUtxos = ({ rune }: { rune: any }) => {
  const [utxos, setUtxos] = useState<any[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: number]: number }>({});
  const [totals, setTotals] = useState<{ [key: number]: number }>({});
  const [prices, setPrices] = useState<{ [key: number]: number }>({});
  const { loading: signLoading, result, error, signTx: sign } = useSignTx();
  const [unsignedPsbtBase64, setUnsignedPsbtBase64] = useState<string>("");
  const [action, setAction] = useState<string>("dummy");
  const [loading, setLoading] = useState(false);
  const walletDetails = useWalletAddress();

  const getRuneUtxosData = async () => {
    try {
      const encodedRune = encodeURIComponent(rune);
      const response = await getRuneUtxos(encodedRune);
      console.log(response?.data?.result, "response");
      setUtxos(response?.data?.result);
    } catch (error) {
      console.log("Error fetching rune UTXOs:", error);
    }
  };

  useEffect(() => {
    getRuneUtxosData();
  }, []);

  const BtcPrice = useSelector(
    (state: RootState) => state.general.btc_price_in_dollar
  );

  const calculateTotal = (inputValue: number, amount: number, utxoIndex: number) => {
    if (isNaN(inputValue)) {
      return 0;
    }
    const total = inputValue * amount;
    setPrices((prev) => ({ ...prev, [utxoIndex]: total }));
    return total / 100000000;
  };
  
  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    utxoIndex: number
  ) => {
    const value = Number(event.target.value);
    setInputValues((prev) => ({ ...prev, [utxoIndex]: value }));
    const totalValue = calculateTotal(value, utxos[utxoIndex]?.runes[0]?.amount, utxoIndex);
    setTotals((prev) => ({ ...prev, [utxoIndex]: totalValue }));
  };
  
  useEffect(() => {
    // Handling Wallet Sign Results/Errors
    if (result) {
      // Handle successful result from wallet sign
      console.log("Sign Result:", result);

     
    }

    if (error) {
      console.error("Sign Error:", error);

      alert("Wallet error occurred");

      setLoading(false);
      // Additional logic here
    }

    // Turn off loading after handling results or errors
    setLoading(false);
  }, [result, error]);

  const listPsbtData = async (utxo: any, utxoIndex: number) => {
    const details = {
      utxo_id: utxo?.utxo_id,
      receive_address: utxo?.address,
      price: prices[utxoIndex],
      wallet: walletDetails?.wallet,
      publickey: walletDetails?.ordinal_pubkey,
    };
    console.log("Listing PSBT with details:", details);
    const response = await listPsbt(details);
    console.log("API Response:", response?.data);
    if (response?.data) {
      setUnsignedPsbtBase64(response.data.unsigned_psbt_base64);
    }
  };

  const handleList = (utxoIndex: number) => {
    const utxo = utxos[utxoIndex];
    listPsbtData(utxo, utxoIndex);
  };
  console.log(unsignedPsbtBase64,"------------unsignedPsbtBase64")

  const signTx = useCallback(async () => {
    if (!walletDetails) {
      alert("connet wallet to procced");
      return;
    }
    let inputs = [];
    inputs.push({
      address: walletDetails.cardinal_address,
      publickey: walletDetails.cardinal_pubkey,
      sighash: 1,
      index: [0],
    });

    const options: any = {
      psbt: unsignedPsbtBase64,
      network: "testnet",
      action: "dummy",
      inputs,
    };
    // console.log(options, "OPTIONS");

    await sign(options);
  }, [action, unsignedPsbtBase64]);

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-50 rounded-lg shadow-lg">
      {utxos?.map((utxo, utxoIndex) => (
        <div
          key={utxoIndex}
          className="w-full border-b-2 py-4 flex flex-wrap items-center justify-between bg-white p-4 rounded-lg shadow-md"
        >
          {utxo.runes?.map((rune: any, runeIndex: any) => (
            <div key={runeIndex} className="w-1/4 flex flex-col items-start">
              <p className="text-sm font-semibold text-gray-700">Rune Name</p>
              <p className="text-lg text-left text-gray-900">{rune.name}</p>
              <p className="text-sm font-semibold text-gray-700 mt-2">Amount</p>
              <p className="text-lg text-gray-900">{rune.amount}</p>
            </div>
          ))}
          <div className="w-1/4 flex flex-col justify-between items-start px-4">
            <p className="text-sm font-semibold text-gray-700">Total</p>
            <p className="text-lg text-gray-900">{totals[utxoIndex] || ""} BTC</p>
            <p className="text-sm font-semibold text-gray-700 mt-2">Value in USD</p>
            <p className="text-lg text-gray-900">{((totals[utxoIndex] || 0) * BtcPrice).toFixed(2)} USD</p>
          </div>
          <div className="w-1/4 flex flex-col items-start px-4">
            <p className="text-sm font-semibold text-gray-700">Input Amount</p>
            <input
              type="number"
              onChange={(e) => handleInput(e, utxoIndex)}
              value={inputValues[utxoIndex] || ""}
              className="w-full border border-customPurple_900 bg-transparent rounded outline-none px-3 py-2 mt-1"
            />
          </div>
         { !unsignedPsbtBase64 ? <div className="w-1/4 flex justify-center mt-4">
            <button
              onClick={() => handleList(utxoIndex)}
              className="custom-gradient text-white font-bold py-2 px-4 rounded cursor-pointer flex justify-center"
            >
              List Now
            </button>
          </div> : <div className="w-1/4 flex justify-center mt-4">
            <button
               onClick={signTx}
              className="custom-gradient text-white font-bold py-2 px-4 rounded cursor-pointer flex justify-center"
            >
              Sign Now
            </button>
          </div> }
        </div>
      ))}
    </div>
  );
};

export default RuneUtxos;
