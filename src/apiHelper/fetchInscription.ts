"use server"
import axios from 'axios';
interface collectionResponse{
  result:any,
  message:string
}

export async function fetchInscription(
  params: any
): Promise<{ data: any; error: string | null } | undefined> {
  const { inscription_id } = params;
  try {
    let url = `${process.env.NEXT_PUBLIC_URL}/api/inscription`;
    const response = await axios.get(url,{
      params:{
        inscription_id
      }
    }); // Adjust the endpoint URL as per your actual API endpoint
    console.log('Data helper single collection:', response.data);
    if (response.status === 200) {
      return { data: response.data || [], error: null };
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}