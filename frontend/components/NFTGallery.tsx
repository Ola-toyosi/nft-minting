"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type NFTData = {
  name: string;
  description: string;
  nftId?: string;
  logoUrl: string;
};

const NFTGallery = ({ ownerWallet }: { ownerWallet: string | null }) => {
  const [nftsData, setNftsData] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    if (!ownerWallet) return; // Prevent API call if wallet is not connected

    const fetchNFTs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${backendUrl}api/nft/gallery/${ownerWallet}`
        );

        if (res.data.nfts) {
          setNftsData(res.data.nfts);
        } else {
          console.error("Unexpected response format:", res.data);
          setError("Invalid NFT data received.");
          setNftsData([]);
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setError("Failed to load NFTs.");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [ownerWallet]);

  if (!ownerWallet) {
    return (
      <p className="text-white text-center mt-8">
        Connect your wallet to view your NFTs.
      </p>
    );
  }

  if (loading) {
    return <p className="text-white text-center mt-8">Loading your NFTs...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  if (!nftsData) {
    return (
      <p className="text-white text-center mt-8">
        No NFTs found, please mint your first one using the widget above
      </p>
    );
  }

  return (
    <section className="px-8 py-12 w-full">
      <h2 className="text-xl font-bold text-left text-white pl-8 mb-6">
        Your NFT Gallery
      </h2>

      {nftsData.length === 0 ? (
        <p className="text-gray-400 text-center">No NFTs found.</p>
      ) : (
        <div className="relative overflow-hidden w-full">
          {/* Scrollable NFT container */}
          <div className="flex gap-6 overflow-x-auto max-w-full scrollbar-hide mx-8 pb-4">
            {nftsData.map((nft) => (
              <div
                key={nft.nftId || nft.name}
                className="bg-[#11182750] w-[400px] rounded-2xl shadow-lg overflow-hidden border border-[#1F2937] shrink-0 scrollbar-hide"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={nft.logoUrl}
                    alt={nft.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white">{nft.name}</h3>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default NFTGallery;
