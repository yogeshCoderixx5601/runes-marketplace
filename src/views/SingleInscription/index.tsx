import { addNotification } from "@/stores/reducers/notificationReducer";
import { shortenString } from "@/utils";
import copy from "copy-to-clipboard";
import React from "react";
import { FiCopy } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useWalletAddress } from "bitcoin-wallet-adapter";
import Link from "next/link";
const SingleInscriptionPage = ({
  inscription,
  inscription_id,
}: {
  inscription: any;
  inscription_id: any;
}) => {
  const walletDetails = useWalletAddress();
  const dispatch = useDispatch();
  console.log(inscription, "---inscription");

  return (
    <div className="flex gap-6 px-10 pt-6">
      <div className="w-6/12 flex justify-center items-center border-[0.5px] border-customPurple_950 rounded bg-customPurple_950">
        <img
          src={`https://cdn.ordinalswallet.com/inscription/preview/${inscription_id}`}
          alt=""
        />
      </div>
      <div className="w-6/12 flex flex-col gap-4 ">
        <div className="w-full  border-[0.5px] border-customPurple_950 rounded px-4">
          <div className="w-full flex flex-col gap-1 border-b border-customPurple_950 py-8">
            <p className="text-[26px] text-[#fafaf9]">
              {" "}
              {inscription.meta.name}
            </p>
            <p className="text-[26px] text-customPurple_900">
              {inscription.collection.name}
            </p>
          </div>
          <div className="w-full flex flex-col gap-6 py-6">
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-6 justify-between">
                <p className="text-lg text-[#a3a3a3]">Owner:</p>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-lg text-customPurple_900">
                    {shortenString(inscription.escrow.seller_address, 8)}
                  </p>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      copy(walletDetails?.cardinal_address + "");
                      dispatch(
                        addNotification({
                          id: new Date().valueOf(),
                          message: "Address Copied",
                          open: true,
                          severity: "success",
                        })
                      );
                    }}
                  >
                    <FiCopy className="ml-2 hover:text-green-600 transition-all" />
                  </div>
                </div>
              </div>
              <div className="flex gap-6 justify-between">
                <p className="text-lg text-[#a3a3a3]">Inscription:</p>
                <p className="text-lg text-[#fafaf9]">{inscription.num}</p>
              </div>
              {/* <div className=""><p>Tag:</p><p>{inscription.escrow.seller_address}</p></div> */}
              <div className="flex gap-6 justify-between">
                <p className="text-lg text-[#a3a3a3]">Ordinal Id:</p>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-lg text-[#fafaf9]">
                    {shortenString(inscription.id, 8)}
                  </p>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      copy(walletDetails?.cardinal_address + "");
                      dispatch(
                        addNotification({
                          id: new Date().valueOf(),
                          message: "Ordinal Id Copied",
                          open: true,
                          severity: "success",
                        })
                      );
                    }}
                  >
                    <FiCopy className="ml-2 hover:text-green-600 transition-all" />
                  </div>
                </div>
              </div>
              <div className="flex gap-6 justify-between">
                <p className="text-lg text-[#a3a3a3]">Block:</p>
                <p className="text-lg text-[#fafaf9]">
                  {inscription.sat.height}
                </p>
              </div>
              <div className="flex gap-6 justify-between">
                <p className="text-lg text-[#a3a3a3]">Insc. Type:</p>
                <p className="text-lg text-[#fafaf9]">
                  {inscription.content_type}
                </p>
              </div>
              <div className="flex gap-6 justify-between">
                <p className="text-lg text-[#a3a3a3]">Out value:</p>
                <p className="text-lg text-[#fafaf9]">
                  {inscription.content_length}
                </p>
              </div>
              <div className="flex gap-6 justify-between">
                <p className="text-lg text-[#a3a3a3]">Offset:</p>
                <p className="text-lg text-[#fafaf9]">
                  {inscription.offset || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Link
            href={`https://ordinalswallet.com/inscription/${inscription_id}`}
            target="_blank"
            className="w-full flex justify-center items-center p-4 custom-gradient rounded"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleInscriptionPage;
