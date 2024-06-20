import dbConnect from "@/lib/dbconnect";
import { Collection } from "@/models";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Inside GET function of API route for collections");

  try {
    // Fetch data from the external API
    const response = await axios.get(
      "https://turbo.ordinalswallet.com/collections"
    );
    const collections = response.data.collections;
    console.log(collections, "Collections fetched");
    const result = response.data;
    await dbConnect();
    const existingids = await Collection.find({
      id: { $in: collections.map((item: { id: string }) => item.id) },
    })
      .select("id")
      .lean();
    console.log(existingids.length, "Existing collections in DB");

    const existingidSet = new Set(existingids.map((item) => item.id));
    console.log(existingidSet.size, "Unique existing ids in DB");

    const newCollections = collections.filter(
      (item: { id: string }) => !existingidSet.has(item.id)
    );
    console.log(newCollections.length, "New collections to insert");

    if (newCollections.length > 0) {
      await Collection.insertMany(newCollections, { ordered: false });
      console.log("New collections inserted into DB");
    } else {
      console.log("No new collections to insert");
    }

    // Return the response with the fetched data
    return NextResponse.json({ result, message: "Data fetched successfully" });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
