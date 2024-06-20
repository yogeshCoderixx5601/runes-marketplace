// "use server";
import axios from "axios";

interface collectionResponse {
  result: any;
  message: string;
}
export async function fetchCollections(): Promise<
  { data: collectionResponse; error: string | null } | undefined
> {
  try {
    const response = await axios.get("/api/collections"); // Adjust the endpoint URL as per your actual API endpoint
    console.log("Data helper:", response.data);
    if (response.status === 200) {
      return { data: response.data || [], error: null };
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}
