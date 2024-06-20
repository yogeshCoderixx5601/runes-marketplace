import React from "react";
import SingleCollectionInscriptions from "../SingleCollectionInscriptions";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const SingleCollectionPage = ({ collection }: { collection: any }) => {
  // console.log(collection, "--------------collections hero");
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-6 rounded p-4  no-scrollbar">
        <div className="flex gap-6 rounded">
          <div className="">
            <img
              src={`https://bis-ord-content.fra1.cdn.digitaloceanspaces.com/ordinals/${getLastPartOfUrl(
                collection.icon
              )}`}
              alt="inscription icon"
              className="w-[100px] h-[100px] object-cover rounded"
            />
          </div>
          <div className="text-white text-lg flex flex-col gap-1">
            <p className="text-lg font-bold">{collection.slug}</p>
            <p className="text-xs font-medium text-[#d0d5dd]">inscription #{collection.highest_inscription_num}-{collection.lowest_inscription_num}</p>
           
           <div className="pt-2 ">
           <p className="text-sm font-medium text-[#667085]">{collection.description}</p>
           </div>
           <div className="flex gap-3">
           <Link href={`${collection.socials.discord}`} className="text-[#d0d5dd] hover:text-white"><FaDiscord /></Link>
           <Link href={`${collection.socials.twitter}`} className="text-[#d0d5dd] hover:text-white"><FaTwitter /></Link>
           </div>
          </div>
        </div>
      </div>
      <div className="">
        <SingleCollectionInscriptions slug={collection.slug} />
      </div>
    </div>
  );
};

export default SingleCollectionPage;

function getLastPartOfUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}
