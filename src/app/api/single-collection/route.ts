import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("Inside GET API route for single collection");

  try {
    const slug = req.nextUrl.searchParams.get('slug');
    console.log(slug, "----------slug");
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const response = await axios.get(`https://turbo.ordinalswallet.com/collection/${slug}`);
    const result = response.data;
    return NextResponse.json({ result, message: "Data fetched successfully" });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
