// "use server"
import axios from 'axios';

export async function fetchSingleCollectionInscriptions(params: any) {
  const { slug } = params;
  try {
    const response = await axios.get(`/api/single-collection-inscriptions?slug=${slug}`); // Adjust the endpoint URL as per your actual API endpoint
    console.log('Data helper single collection:', response.data);
    return { result: response.data }; // Ensure you return an object with `result` property
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to propagate it up
  }
}
