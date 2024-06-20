"use client";
import { fetchCollection } from "@/apiHelper/singleCollection";
import SingleCollectionPage from "@/views/singleCollection";
import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


const SingleCollection = ({ params }: { params: { slug: string } }) => {
  console.log(params, "params");
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(
        {
          slug: params.slug,
        },
        "QUERY"
      );

      const response = await fetchCollection({ slug: params.slug });
      console.log(response, "------response");
      if (!response || !response.data?.result) {
        console.log("no result");
        setError("Collection not found or error in fetching collection result");
      } else {
        setCollection(response.data?.result);
        console.log(response.data?.result, "collection data");
      }
    } catch (error) {
      console.error("Error fetching collection data", error);
      setError("Error fetching collection data");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (params.slug) fetchData();
  }, [params, fetchData]);
  // console.log(collection, "-----collection");

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        <CircularProgress color="inherit" className="sm:w-20 md:w-60" />
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="flex flex-wrap justify-center items-center h-screen bg-primary p-6">
        {error || "Collection not found or error in fetching collection data"}
      </div>
    );
  }

  return (
<div className="text-white h-screen">
      <SingleCollectionPage collection={collection} />
    </div>
  );
};

export default SingleCollection;
