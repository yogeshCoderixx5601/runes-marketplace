"use client";
import { fetchSingleCollectionInscriptions } from "@/apiHelper/fetchSingleCollectionInscriptions";
import {
  convertSatoshiToBTC,
  convertSatoshiToUSD,
  getBTCPriceInDollars,
  shortenString,
} from "@/utils";
import React, { useCallback, useEffect, useState } from "react";
import { setBTCPrice } from "@/stores/reducers/generalReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores";
import { FaBtc } from "react-icons/fa6";
import { useRouter } from "next/navigation"; 

const SingleCollectionInscriptions = ({ slug }: { slug: string }) => {
  const [collectionInscription, setCollectionInscription] = useState<
    any[] | null
  >(null);
  const [currency, setCurrency] = useState("usd"); 
  const dispatch = useDispatch();
  const btcPrice = useSelector(
    (state: RootState) => state.general.btc_price_in_dollar
  );
  const router = useRouter();
  const getBTCPrice = useCallback(async () => {
    // console.log("Getting new BTC Price...");
    const price = await getBTCPriceInDollars();
    if (price) dispatch(setBTCPrice(price));
  }, [dispatch]);
  useEffect(() => {
    const fetchInscriptionsData = async () => {
      try {
        const response = await fetchSingleCollectionInscriptions({ slug });
        // console.log(
        //   response.result.message,
        //   "response fetchSingleCollectionInscriptions"
        // );
        setCollectionInscription(response.result.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getBTCPrice();
    fetchInscriptionsData();
  }, [slug]);

  console.log(collectionInscription, "--------collectionInscriptions");

  if (!collectionInscription) {
    return <div>Loading...</div>;
  }

  function removeHyphensFromSlug(slug: string): string {
    return slug.replace(/-/g, " ");
  }

  const btcUsd = () => {
    if (currency === "usd") {
        setCurrency("btc");
      } else if (currency === "btc") {
        setCurrency("usd");
      }
  }

  const handleSingleCollectionn = (inscription: number) => {
    router.push(`/inscriptions/${inscription}`);
  };
  return (
    <div className="block w-full border border-customPurple_950">
      <div className="w-full caption-bottom text-sm max-h-screen overflow-y-auto overflow-x-hidden no-scrollbar">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-customPurple_950 z-10 pb-2 border-blue-700">
            <tr>
              <th className="p-3 text-center">#</th>
              <th className="p-3 text-start">Name</th>
              <th className="p-3 flex items-center justify-end">Price ({currency}) <span onClick={btcUsd} className="text-bitcoin pl-2 cursor-pointer">{currency}</span></th>
              <th className="p-3 text-end">Owners</th>
              <th className="p-3 text-end">Inscription#</th>
            </tr>
          </thead>
          <tbody>
            {collectionInscription.map((item, index) => (
              <tr
                key={index}
                className=" border-b-[0.5px] border-customPurple_950 cursor-pointer transition-colors duration-300 hover:bg-[#571343] px-2"
                onClick={() => handleSingleCollectionn(item.inscription_id)}
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 flex items-center">
                  <img
                    src={`https://cdn.ordinalswallet.com/inscription/preview/${item.inscription_id}`}
                    alt="inscription icon"
                    className="w-6 h-6 object-cover mr-2"
                  />
                  <span>{removeHyphensFromSlug(slug)}</span>
                </td>
              {currency === "btc" ?   (<td className="p-3 text-end">
                      {convertSatoshiToBTC(item.satoshi_price).toFixed(2) ||
                    "-" }
                </td>) :
               ( <td className="p-3 text-end">
                      {convertSatoshiToUSD(item.satoshi_price,btcPrice).toFixed(2) ||
                    "-" }
                </td>)}
                <td className="p-3 text-end">
                  {shortenString(item.seller_address, 5) || "-"}
                </td>
                <td className="p-3 text-end">{item.inscription || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleCollectionInscriptions;
