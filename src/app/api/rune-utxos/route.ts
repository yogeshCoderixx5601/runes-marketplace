import dbConnect from "@/lib/dbconnect";
import UtxoModel from "@/models/Runes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const runeName = req.nextUrl.searchParams.get("rune");
   
    console.log(runeName, "---------runeName");
    if (!runeName) {
      return NextResponse.json(
        { success: false, message: "Rune name is required" },
        { status: 400 }
      );
    }

    const decodedRune = decodeURIComponent(runeName);
    console.log(decodedRune,"---decodedRune")
    await dbConnect(); // Ensure database connection is established

    // Example query to find UTXOs for the specified runeName
    const result = await UtxoModel.find({
      runes: {
        $elemMatch: { name: decodedRune },
      },
    });

    return NextResponse.json({
      result,
      success: true,
      message: "User runes fetched successfully",
    });
  } catch (error) {
    console.error("Error in GET /api/rune-utxos:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
