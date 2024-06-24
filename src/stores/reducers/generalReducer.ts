import { IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  btc_price_in_dollar: number;
  user: IUser|null;
} = {
  btc_price_in_dollar: 0,
  user: null
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setBTCPrice: (state, action: PayloadAction<number>) => {
      state.btc_price_in_dollar = action.payload;
    },
  },
});

export const { setBTCPrice, setUser } =
  generalSlice.actions;
export default generalSlice.reducer;
