"use client"

import { useEffect, useState } from "react";
import axios from "axios";

type NFTData = {
  name: string;
  description: string;
  imageUrl: string;
};

const NFTGallery = () => {
  const [nfts, setNfts] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/nft").then((response) => {
  //     setNfts(response.data);
  //   });
  // }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {nfts.map((nft: NFTData, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-lg">
          <img
            src={nft.imageUrl}
            alt={nft.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2">{nft.name}</h3>
          <p className="text-gray-700">{nft.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;
