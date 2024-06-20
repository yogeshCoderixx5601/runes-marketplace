import dbConnect from '@/lib/dbconnect';
import { Inscription } from '@/models';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("Inside GET API route for single collection inscription");

  try {
    const slug = req.nextUrl.searchParams.get('slug');
    console.log(slug, "----------slug");
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const response = await axios.get(`https://turbo.ordinalswallet.com/collection/${slug}/escrows`);
    const result = response.data;
    // console.log(result,"result fetchSingleCollectionInscriptions")
    await dbConnect()
  // Filter out existing inscriptions based on a unique field (e.g., `id` or `inscription_id`)
  const existingIds = await Inscription.find({ id: { $in: result.map((item: { id: string; }) => item.id) } }).select('id').lean();
  const existingIdSet = new Set(existingIds.map(item => item.id));
  const newInscriptions = result.filter((item: { id: string; }) => !existingIdSet.has(item.id));

  // Insert only non-existing inscriptions
  if (newInscriptions.length > 0) {
    await Inscription.insertMany(newInscriptions, { ordered: false });
  }
    return NextResponse.json({ result, message: "Data fetched successfully" });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
