"use client";
import { getRuneUtxos } from "@/apiHelper/getRuneUtxos";
import { RootState } from "@/stores";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RuneUtxos = ({ rune }: { rune: any }) => {
  const [utxos, setUtxos] = useState<any[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: number]: number }>({});
  const [totals, setTotals] = useState<{ [key: number]: number }>({});

  const getRuneUtxosData = async () => {
    try {
      const encodedRune = encodeURIComponent(rune); // Encode the rune parameter
      const response = await getRuneUtxos(encodedRune);
      console.log(response?.data?.result, "response");
      setUtxos(response?.data?.result);
    } catch (error) {
      console.log("Error fetching rune UTXOs:", error);
    }
  };

  useEffect(() => {
    getRuneUtxosData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleList = (
    event: React.ChangeEvent<HTMLInputElement>,
    utxoIndex: number
  ) => {
    const value = Number(event.target.value);
    setInputValues((prev) => ({ ...prev, [utxoIndex]: value }));
    const totalValue = calculateTotal(value, utxos[utxoIndex].runes[0].amount);
    setTotals((prev) => ({ ...prev, [utxoIndex]: totalValue }));
  };

  const BtcPrice = useSelector(
    (state: RootState) => state.general.btc_price_in_dollar
  );

  const calculateTotal = (inputValue: number, amount: number) => {
    if (isNaN(inputValue)) {
      return 0;
    }
    return (inputValue * amount) / 100000000;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {utxos?.map((utxo, utxoIndex) => (
        <div
          key={utxoIndex}
          className="w-full border-b-2 py-2 flex items-center justify-between"
        >
          {utxo.runes?.map((rune: any, runeIndex: any) => (
            <div key={runeIndex} className="w-1/4 flex justify-between">
              <p className="text-left">{rune.name}</p>
              <p>{rune.amount}</p>
            </div>
          ))}
          <div className="w-1/4 flex justify-between items-center px-4">
            <div className="flex justify-between">
              <p>{totals[utxoIndex] || ""} BTC</p>
              <p className="pl-3">
                {((totals[utxoIndex] || 0) * BtcPrice).toFixed(2)} USD
              </p>
            </div>
          </div>
          <input
            type="number"
            onChange={(e) => handleList(e, utxoIndex)}
            value={inputValues[utxoIndex] || ""}
            className="w-1/4 border border-customPurple_900 bg-transparent rounded outline-none px-3"
          />
        </div>
      ))}
      <div className="w-full flex justify-center">
        <div className="w-1/4 custom-gradient text-white font-bold py-2 px-4 rounded cursor-pointer flex justify-center">
          List Now
        </div>
      </div>
    </div>
  );
};

export default RuneUtxos;
