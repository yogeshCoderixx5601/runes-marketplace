import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("Inside GET function of API route for collections");

  try {
    const response = await axios.get('https://turbo.ordinalswallet.com/collections');
    const result = response.data;
    console.log(result,"result collections route")
    return NextResponse.json({result, message:"data get successfully"});
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}




