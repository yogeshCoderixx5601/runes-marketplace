"use server";
import { IUser } from "@/types";
import axios from "axios";

interface UserResponse {
  success: boolean;
  message: string;
  result: IUser;
}

export async function addUser(
  walletDetails: any
): Promise<{ data?: UserResponse; error: string | null } | undefined> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/user`,
      walletDetails
    );

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
