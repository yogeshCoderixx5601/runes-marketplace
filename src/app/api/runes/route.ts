// set runes in [runes] based on the ordinal address in user collection
import dbConnect from "@/lib/dbconnect";
import { User } from "@/models";
import UtxoModel from "@/models/Runes";
import { IRune } from "@/types";
import { aggregateRuneAmounts, getRunes } from "@/utils/Runes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const walletDetails = await req.json();
    console.log(walletDetails, "wallet details");

    const runesUtxos = await getRunes(walletDetails.ordinal_address);

    const aggregateRuneAmount = aggregateRuneAmounts(runesUtxos);

    await dbConnect();

    const runes = aggregateRuneAmount.map((rune) => ({
      name: rune.name,
      amount: rune.amount,
    }));

    const address = walletDetails.ordinal_address;

    for (const rune of aggregateRuneAmount) {
      const query = {
        ordinal_address: address,
        "runes.name": { $ne: rune.name },
      };
      const update = { $addToSet: { runes: rune } };

      const result = await User.findOneAndUpdate(query, update, {
        new: true,
        useFindAndModify: false,
      });

      if (result) {
        // `Rune ${rune.name} already exists, no update performed`
        console.log(`Rune updated successfully`);
      } else {
        console.log(`Rune ${rune.name} already exists, no update performed`);
        // throw new Error(`Rune ${rune.name} already exists, no update performed`)
      }
    }


    const transformedUtxos = runesUtxos.map(utxo => {
      const runes: IRune[] = Object.entries(utxo.rune || {}).map(([key, value]) => {
        // Explicitly type the value
        const runeValue = value as { name: string; amount: number,divisibility:number,symbol:string };
        return {
          name: key,
          amount: runeValue.amount,
          divisibility:runeValue.divisibility,
          symbol:runeValue.symbol
        };
      });
      const { rune, ...rest } = utxo;
      return { ...rest, runes };
    });
    console.log(transformedUtxos, "------transformedUtxos");

    const utxos = await UtxoModel.create(transformedUtxos);
    console.log("Runes UTXOs saved successfully", utxos);

    return NextResponse.json({
      message: "Data received and processed successfully.",
      utxos: utxos,
    });
  } catch (error) {
    console.error("Error :", error);
    return NextResponse.json({ error: "Error " }, { status: 500 });
  }
}


