import dbConnect from '@/lib/dbconnect';
import { Inscription } from '@/models';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("Inside GET API route for single collection inscription");

  try {
    const inscription_id = req.nextUrl.searchParams.get('inscription_id');
    console.log(inscription_id, "----------inscription_id");
    
    if (!inscription_id) {
      return NextResponse.json({ error: 'inscription_id is required' }, { status: 400 });
    }

    const response = await axios.get(`https://turbo.ordinalswallet.com/inscription/${inscription_id}`);
    const result = response.data;
    // console.log(result,"result fetchSingleCollectionInscriptions")

    // await dbConnect()
    // const inscriptionsDb = await Inscription.insertMany(result,{ ordered: false })
    // console.log(inscriptionsDb,"---------inscriptionsDb")
    return NextResponse.json({ result, message: "Data fetched successfully" });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}