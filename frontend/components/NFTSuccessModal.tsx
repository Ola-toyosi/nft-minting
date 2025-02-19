import { Share } from "next/font/google";
import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";

interface NFTSuccessModalProps {
  nftName: string;
  description: string;
  nftId: string;
  onMintAnother: () => void;
  onShare: () => void;
}

const NFTSuccessModal: React.FC<NFTSuccessModalProps> = ({
  nftName,
  description,
  nftId,
  onMintAnother,
  onShare,
}) => {
  return (
    // <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-80">
      <section className="bg-black text-white w-[400px] p-6 rounded-lg border border-green-500 shadow-lg">
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircleTwoToneIcon />
        </div>

        {/* Success Message */}
        <h2 className="text-center text-xl font-semibold text-green-400 mt-4">
          NFT Minted Successfully!
        </h2>
        <p className="text-gray-400 text-center text-sm mt-1">
          Your NFT has been created and added to your collection
        </p>

        {/* NFT Preview */}
        <div className="bg-[#161B22] rounded-md mt-4 p-4">
          <div className="h-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md"></div>
          <div className="mt-4">
            <p className="text-gray-400 text-sm">NFT Name</p>
            <p className="font-semibold">{nftName}</p>
            <p className="text-gray-400 text-sm mt-2">Description</p>
            <p className="text-gray-300">{description}</p>
            <p className="text-gray-400 text-sm mt-2">NFT ID</p>
            <p className="text-blue-400">{nftId}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={onShare}
            className="flex items-center justify-center w-1/2 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md"
          >
            <ShareIcon />
            Share
          </button>
          <button
            onClick={onMintAnother}
            className="w-1/2 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-80 text-white py-2 rounded-md font-medium"
          >
            Mint Another
          </button>
        </div>
      </section>
    // </div>
  );
};

export default NFTSuccessModal;
