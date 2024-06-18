import { ICollection } from "@/types";
import Link from "next/link";
import React from "react";

interface SearchCardProps {
  // collection: ICollection;
  setCollections: React.Dispatch<React.SetStateAction<ICollection[] | null>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}
const SearchCard = ({
 
}) => {
  return (
    <div className="w-full hover:bg-primary-dark px-3 py-1">
      <Link href={`/collection/`}/>
    </div>
  );
};

export default SearchCard;
