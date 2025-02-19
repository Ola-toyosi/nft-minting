"use client";

import { useState } from "react";
import cube from "@/assets/cube.png"; // Importing icon
import Image from "next/image";

type NFTData = {
  name: string;
  description: string;
  logoUrl: string;
  ownerWallet: string;
};

type NFTMintFormProps = {
  onMint: (nft: NFTData) => void;
};

const NFTMintForm: React.FC<NFTMintFormProps> = ({ onMint }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [ownerWallet, setOwnerWallet] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onMint({ name, description, logoUrl, ownerWallet });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#11182780] shadow-lg p-8 rounded-xl w-full max-w-lg mx-auto text-white"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Mint Your NFT</h2>

      {/* NFT Name */}
      <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">
        NFT Name
      </label>
      <input
        type="text"
        placeholder="Enter NFT name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-sm  bg-[#1f2937] border border-[#374151] p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Description */}
      <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">
        Description
      </label>
      <textarea
        placeholder="Describe your NFT"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-[#1f2937] text-sm  border border-[#374151] p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />

      {/* Image Upload */}
      <label className="block text-sm font-medium mb-1 text-[#9CA3AF]">
        Image URL
      </label>
      <input
        type="text"
        placeholder="Enter logoUrl URL"
        onChange={(e) => setLogoUrl(e.target.value)}
        className="bg-[#1f2937]  text-sm border border-[#374151] p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Mint Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
      >
        <Image src={cube} alt="cube" /> Mint NFT
      </button>
    </form>
  );
};

export default NFTMintForm;
