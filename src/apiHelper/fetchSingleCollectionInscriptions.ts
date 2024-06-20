"use server"
import axios from 'axios';

export async function fetchSingleCollectionInscriptions(params: any): Promise<{ data: any; error: string | null } | undefined> {
  const { slug } = params;
  try {
    let url = `${process.env.NEXT_PUBLIC_URL}/api/single-collection-inscriptions`;
    const response = await axios.get(url,{
      params:{
        slug
      }
    }); // Adjust the endpoint URL as per your actual API endpoint
    if (response.status === 200) {
      return { data: response.data || [], error: null };
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}
