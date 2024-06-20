// "use server"
import axios from 'axios';

export async function fetchInscription(params: any) {
  const { inscription_id } = params;
  try {
    const response = await axios.get(`/api/inscription?inscription_id=${inscription_id}`); // Adjust the endpoint URL as per your actual API endpoint
    console.log('Data helper single collection:', response.data);
    return { result: response.data }; // Ensure you return an object with `result` property
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to propagate it up
  }
}