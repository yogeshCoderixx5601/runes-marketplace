"use server"
import axios from 'axios';

export async function fetchCollection(params: any): Promise<{ data: any; error: string | null } | undefined>  {
  const { slug } = params;
  try {
    let url = `${process.env.NEXT_PUBLIC_URL}/api/single-collection`;
    const response = await axios.get(url,{
      params:{
        slug
      }
    });
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

