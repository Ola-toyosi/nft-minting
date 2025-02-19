"use client";

import { useState } from "react";

type NFTData = {
  name: string;
  description: string;
  image: File | string;
};

type NFTMintFormProps = {
  onMint: (nft: NFTData) => void;
};

const NFTMintForm: React.FC<NFTMintFormProps> = ({ onMint }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onMint({ name, description, image });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Mint Your NFT</h2>
      <input
        type="text"
        placeholder="NFT Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImage(file);
        }}
        className="mb-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Mint NFT
      </button>
    </form>
  );
};

export default NFTMintForm;
