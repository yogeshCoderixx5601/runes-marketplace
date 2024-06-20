"use client";
import React, { useState, useEffect } from "react";
import { fetchCollections } from "@/apiHelper/fetchCollections"; 
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useRouter } from "next/navigation"; 

const CollectionInscriptionPage = () => {
  const [collectionInscription, setCollectionInscription] = useState<any[]>([]); 
  const [totalCollection, setTotalCollection] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const response = await fetchCollections();
        console.log(response?.data.result.collections, "response");
        setCollectionInscription(response?.data.result.collections);
        setTotalCollection(response?.data.result.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCollectionData();
  }, []);

  const btcPrice = useSelector(
    (state: RootState) => state.general.btc_price_in_dollar
  );

  const handleSingleCollectionn = (slug: string) => {
    router.push(`/collections/${slug}`);
  };

  return (
    <div className="block w-full px-2">
      <div className="flex justify-between items-center p-6 border-y-[0.5px] border-customPurple_950">
        <div className="flex justify-center items-center text-xl">
          {/* <FaBorderAll /> */}
          <span className="text-xl text-white font-bold pl-2">All Collections</span>
        </div>
        <div className="flex gap-4">
          <div className="border-r border-customPurple_950 pr-3">
            <p>Total Collections</p>
            <p className="text-white flex justify-end">{totalCollection}</p>
          </div>
          <div className="border-r border-customPurple_950 pr-3">
            <p>24H Vol.</p>
            <p className="text-white flex justify-end">{collectionInscription[0]?.volume_hour || "-"}</p>
          </div>
          <div className="border-r border-customPurple_950 pr-3">
            <p>7D Vol.</p>
            <p className="text-white flex justify-end">{collectionInscription[0]?.volume_week || "-"}</p>
          </div>
          <div className="border-r border-customPurple_950 pr-3">
            <p>30D Vol.</p>
            <p className="text-white flex justify-end">{collectionInscription[0]?.volume_month || "-"}</p>
          </div>
          <div>
            <p>All Time Vol.</p>
            <p className="text-white flex justify-end">{collectionInscription[0]?.volume_all_time || "-"}</p>
          </div>
        </div>
      </div>
      <div className="w-full caption-bottom text-sm max-h-screen overflow-y-auto overflow-x-hidden no-scrollbar">
        <table className="w-full border-collapse border-accent">
          <thead className="sticky top-0 bg-dark_gray z-10">
            <tr>
              <th className="p-3 text-center">#</th>
              <th className="p-3 text-start">Name</th>
              <th className="p-3 text-end">Floor</th>
              <th className="p-3 text-end">24H Volume</th>
              <th className="p-3 text-end">7D Volume</th>
              <th className="p-3 text-end">30D Volume</th>
              <th className="p-3 text-end">Owners</th>
              <th className="p-3 text-end">Supply</th>
            </tr>
          </thead>
          <tbody>
            {collectionInscription.map((item, index) => (
              <tr
                key={index}
                className="border-b-[0.5px] border-customPurple_950 cursor-pointer transition-colors duration-300 hover:bg-[#571343]"
                onClick={() => handleSingleCollectionn(item.slug)}
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 flex items-center">
                  <img src={item.banner_icon || item.icon} alt="inscription icon" className="w-6 h-6 object-cover mr-2" />
                  <span>{item.name}</span>
                </td>
                <td className="p-3 text-end">{item.floor_price || "-"}</td>
                <td className="p-3 text-end">{item.volume_hour || "-"}</td>
                <td className="p-3 text-end">{item.volume_week || "-"}</td>
                <td className="p-3 text-end">{item.volume_month || "-"}</td>
                <td className="p-3 text-end">{item.owners || "-"}</td>
                <td className="p-3 text-end">{item.total_supply || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionInscriptionPage;
