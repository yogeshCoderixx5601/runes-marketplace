"use server";
import axios from "axios";

export interface searchCollectionsParams {
  searchQuery: string
}

export interface searchCollectionsResponse {
  result: any[];
  success: boolean;
  message: string;
}

export async function searchCollections(
  params: searchCollectionsParams
): Promise<{ data: searchCollectionsResponse; error: string | null } | undefined> {

  try {
    let url = `${process.env.NEXT_PUBLIC_URL}/api/collection/search-collections`;
    const response = await axios.get(url, {
      params
    });

    if (response.status === 200) {
      return { data: response.data || [], error: null };
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}
