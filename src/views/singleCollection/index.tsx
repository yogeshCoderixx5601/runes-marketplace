import React from "react";

const SingleCollectionPage = ({ collection }: { collection: any }) => {
  return (
    <div className="flex gap-4 p-4">
      <div className="">
      <img src={collection.banner_icon || collection.icon} alt="inscription icon" className="w-[200px] h-[200px] object-cover rounded" />
      </div>
      <div className="text-white text-sm flex flex-col gap-2">
        <div className="">{collection.name}</div>
        <div className="">Inscription: #{collection.lowest_inscription_num}-{collection.highest_inscription_num}</div>
        <div className="">Total Supply: {collection.total_supply}</div>
        <div className="text-gray-400"><span className="text-white">Description:</span> {collection.description}</div>
        
      </div>
    </div>
  );
};

export default SingleCollectionPage;
