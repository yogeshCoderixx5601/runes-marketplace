"use server";
import axios from "axios";

interface UserResponse {
  success: boolean;
  message: string;
  result: any;
}

export async function listItems(
  listData: any
): Promise<{ data?: UserResponse; error: string | null } | undefined> {
  try {

    // console.log(ordinal_address,"------------helper wallet")
    let url = `${process.env.NEXT_PUBLIC_URL}/api/order/list-items`;
    const response = await axios.post(url,{
      params:{
       listData
      }
    })
// console.log(response,"--------response helper")

    if (response.status === 200) {
      return { data: response.data, error: null };
    } else {
      // You might want to customize this message or extract more specific info from the response
      return { error: `Request failed with status code: ${response.status}` };
    }
  } catch (error:any) {
    // Assuming error is of type any. You might want to add more specific type handling
    return { error: error?.message || "An unknown error occurred" };
  }
}
