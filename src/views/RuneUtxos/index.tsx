"use client";
import { getRuneUtxos } from "@/apiHelper/getRuneUtxos";
import React, { useEffect, useState } from "react";

const RuneUtxos = ({ rune }: { rune: any }) => {
  const [utxos, setUtxos] = useState<any[]>([]);
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

  return (
    <div className="w-full flex flex-col gap-4 ">
      <tbody className="w-full flex flex-col">
        {utxos?.map((utxo, index) => (
          <tr key={index} className="w-full">
            <td className="w-full flex">
              {utxo.runes?.map((rune: any, index: any) => (
                <div key={index} className="flex justify-between w-full">
                  <p>{rune.name}</p>
                  <p>{rune.amount}</p>
                  <input type="text" name="" id="" className=" border border-customPurple_900 bg-transparent rounded outline-none px-3"/>
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
      <div className="w-full flex justify-end">
        <div className="custom-gradient text-white font-bold py-2 px-4 rounded justify-end cursor-pointer">
          Mint
        </div>
      </div>
    </div>
  );
};

export default RuneUtxos;
