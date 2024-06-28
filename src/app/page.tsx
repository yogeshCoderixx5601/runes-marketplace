"use client";
import { getAllRune } from "@/apiHelper/getAllRunes";
import { getRuneUtxos } from "@/apiHelper/getRuneUtxos";
import SellRunePage from "@/views/HomePage/SellRunes";
import { useEffect, useState } from "react";

export default function Home() {
  const [runes, setRenus] = useState<any>()
  const Runesutxo = async () => {
    try {
      const response = await getAllRune();
      console.log(response?.data?.utxos, "-----------------response");
      setRenus(response?.data?.utxos)
    } catch (error) {}
  };

  useEffect(() => {
    Runesutxo();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SellRunePage  runes={runes}/>
    </main>
  );
}
