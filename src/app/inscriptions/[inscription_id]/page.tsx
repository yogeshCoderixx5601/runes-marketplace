"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import SingleInscriptionPage from "@/views/SingleInscription";
import { fetchInscription } from "@/apiHelper/fetchInscription";


const SingleInscription = ({ params }: { params: { inscription_id: number } }) => {
  console.log(params, "params");
  const [loading, setLoading] = useState(true);
  const [inscription, setInscription] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(
        {
          inscription_id: params.inscription_id,
        },
        "QUERY"
      );

      const response = await fetchInscription({ inscription_id: params.inscription_id });
      console.log(response, "------response");
      if (!response || !response.result?.result) {
        console.log("no result");
        setError("Collection not found or error in fetching collection result");
      } else {
        setInscription(response.result?.result);
        console.log(response.result?.result, "collection data");
      }
    } catch (error) {
      console.error("Error fetching collection data", error);
      setError("Error fetching collection data");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (params.inscription_id) fetchData();
  }, [params, fetchData]);
  console.log(inscription, "-----inscription");

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        <CircularProgress color="inherit" className="sm:w-20 md:w-60" />
      </div>
    );
  }

  if (error || !inscription) {
    return (
      <div className="flex flex-wrap justify-center items-center h-screen bg-primary p-6">
        {error || "Collection not found or error in fetching collection data"}
      </div>
    );
  }

  return (
<div className="text-white h-screen">
      <SingleInscriptionPage inscription={inscription} inscription_id={params.inscription_id} />
    </div>
  );
};

export default SingleInscription;
