"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import cube from "@/assets/cube.png";

type NFTData = {
  name: string;
  description: string;
  nftId?: string;
  logoUrl: string;
};

// const DEFAULT_IMAGE = "/default-nft.png"; // Add a default image

const NFTGallery = ({ ownerWallet }: { ownerWallet: string | null }) => {
  const [nftsData, setNftsData] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!ownerWallet) return;

    const fetchNFTs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${backendUrl}api/nft/gallery/${ownerWallet}`
        );

        if (Array.isArray(res.data.nfts)) {
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
  }, [ownerWallet, backendUrl]);

  if (!ownerWallet) {
    return (
      <section className="px-8 py-12 w-full">
        <h2 className="text-xl font-bold text-left text-white pl-8 mb-6">
          Your NFT Gallery
        </h2>
        <p className="text-white text-lg text-center m-8 w-auto p-6">
          Connect your wallet to view your NFTs.
        </p>
      </section>
    );
  }

  if (loading) {
    return <p className="text-white text-center mt-8">Loading your NFTs...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  if (nftsData.length === 0) {
    return (
      <section className="px-8 py-12 w-full">
        <h2 className="text-xl font-bold text-left text-white pl-8 mb-6">
          Your NFT Gallery
        </h2>
        <p className="text-white text-lg text-center m-8 w-auto p-6">
          No NFTs found, please mint your first one using the widget above.
        </p>
      </section>
    );
  }

  return (
    <section className="px-8 py-12 w-full">
      <h2 className="text-xl font-bold text-left text-white pl-8 mb-6">
        Your NFT Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-[vw] justify-center">
        {nftsData.map((nft) => (
          <div
            key={nft.nftId || nft.name}
            className="bg-[#11182750] w-[100%] rounded-2xl shadow-lg overflow-hidden border border-[#1F2937] mx-auto"
          >
            <div className="relative h-56 w-full">
              <Image
                src={nft.logoUrl || cube}
                alt={nft.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl"
                onError={(e) => (e.currentTarget.src = cube.src)} // Fallback to default image
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{nft.name}</h3>
              <p className="text-gray-400">{nft.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NFTGallery;
