"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Suggestions from "./SearchSuggection";
import { searchCollections } from "@/apiHelper/searchCollections";
import { ICollection } from "@/types";

function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [collections, setCollections] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    const searchCollection = async () => {
      try {
        setLoading(true);
        if (searchQuery.trim() === "") {
          setCollections(null);
          setLoading(false);
          return;
        }
        const result = await searchCollections({
          searchQuery,
        });
        if (result?.error) {
          setError(result.error);
          setCollections(null);
        } else {
          setCollections(result?.data?.result || []);
        }
      } catch (error) {
        setError(error);
        setCollections(null);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery.trim() !== "") {
      searchCollection();
      setShowSuggestions(true);
    } else {
      setCollections(null);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center justify-center w-full">
        <div className="w-full relative flex justify-between items-center lg:border xl:border-2 border-custom_bg rounded-md py-4 lg:p-0">
          <input
            className="p-2 bg-transparent text-white placeholder-brand_text_primary focus:outline-none focus:shadow-outline w-full"
            type="search"
            placeholder="search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <div className="text-white px-2 hidden lg:block">
            <FaSearch />
          </div>
        </div>
      </div>
      {showSuggestions && (
        <Suggestions
          loading={loading}
          collections={collections}
          error={error}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
}

export default Search;
