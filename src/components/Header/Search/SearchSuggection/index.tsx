// Suggestions.tsx
import React from "react";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";

interface SuggestionsProps {
  loading: boolean;
  collections: any[] | null;
  error: any;
  handleSuggestionClick: () => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  loading,
  collections,
  error,
  handleSuggestionClick,
}) => {
  return (
    <div className="absolute bg-primary text-white w-full rounded-sm shadow-lg  border border-custom_bg mt-2">
      <div className="px-4 py-2">
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress color="inherit" size={24} />
          </div>
        ) : collections && collections.length > 0 ? (
          collections.map((item) => (
            <Link key={item.slug} href={`/collections/${item.slug}`}>
              <h6
                className="block py-2"
                onClick={handleSuggestionClick}
              >
                {item.name}
              </h6>
            </Link>
          ))
        ) : (
          <p className="text-lg">
            {error ? "Error fetching collection data" : "No collection found"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
