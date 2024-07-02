"use client";
import { getAllRune } from "@/apiHelper/getAllRunes";
import { IBuyRunes } from "@/types";
import SellRunePage from "@/views/HomePage/SellRunes";
import { useEffect, useState } from "react";

export default function Home() {
  const [runes, setRunes] = useState<IBuyRunes[]>([]);
  const Runesutxo = async () => {
    try {
      const response = await getAllRune();
      console.log(response?.data?.result, "-----------------response");
      const runes = response?.data?.result;
      if (runes) {
        console.log(runes, "-----------------response");
        setRunes(runes); // Update state only if runes is defined
      } else {
        console.log("No data received from API");
        // Handle case where response.data.result is undefined
      }
   
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
