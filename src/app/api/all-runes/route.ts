import dbConnect from "@/lib/dbconnect";
import RuneUtxo from "@/models/Runes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const result = await RuneUtxo.find({listed:true})
    .select('listed_price listed_price_per_token runes.amount runes.name')
    console.log(result, "---------------result");
    return NextResponse.json({ success: true, utxos: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "no data found" });
  }
}
