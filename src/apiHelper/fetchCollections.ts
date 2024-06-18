// "use server"
import axios from 'axios';

export async function fetchCollections() {
  
  try {
    const response = await axios.get('/api/collections'); // Adjust the endpoint URL as per your actual API endpoint
    console.log('Data helper:', response.data);
    return { result: response.data }; // Ensure you return an object with `data` property
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to propagate it up
  }
}


