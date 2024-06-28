import { RootState } from "@/stores";
import { convertSatoshiToBTC, convertSatoshiToUSD } from "@/utils";
import React from "react";
import { useSelector } from "react-redux";

const SellRunePage = ({ runes }: { runes: any }) => {
  console.log(runes);
  const BtcPrice = useSelector(
    (state: RootState) => state.general.btc_price_in_dollar
  );
  return (
    <div>
      {runes?.map((rune: any) => (
        <div
          className="flex flex-col border-[0.1px] border-customPurple_900 rounded p-3 gap-2"
          key={rune._id}
        >
          <div className="flex flex-col justify-center items-center ">
            <p>listed price per oken: {convertSatoshiToBTC(rune.listed_price).toFixed(4)}BTC</p>
            <p>listed price: {convertSatoshiToUSD(rune.listed_price, BtcPrice).toFixed(2)}USD</p>
            {/* <p> {rune.runes[0].amount}</p> */}
            <p> {rune.runes[0].name}</p>
          </div>
          <div className="flex w-full">
            <div className="border border-customPurple_950 rounded flex w-full justify-center items-center cursor-pointer custom-gradient">
              Buy Now
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellRunePage;
