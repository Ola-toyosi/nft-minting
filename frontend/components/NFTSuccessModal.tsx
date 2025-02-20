import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";
import cube from "@/assets/cube.png"; // Importing icon
import check from "@/assets/div.png"; // Importing icon

interface NFTSuccessModalProps {
  nftName: string;
  description: string;
  nftId?: string;
  logoUrl: string;
  onMintAnother: () => void;
  onShare: () => void;
}

const NFTSuccessModal: React.FC<NFTSuccessModalProps> = ({
  nftName,
  description,
  nftId,
  logoUrl,
  onMintAnother,
  onShare,
}) => {
  return (
    // <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-80">
    <section className="bg-[#11182780] text-white w-full max-w-lg p-6 rounded-lg border border-green-500 shadow-lg">
      {/* Success Icon */}
      <div className="flex justify-center">
        <Image src={check} alt="succes-green-check" />
      </div>

      {/* Success Message */}
      <h2 className="text-center text-xl font-semibold text-[#10b981] mt-4">
        NFT Minted Successfully!
      </h2>
      <p className="text-[9CA3AF] text-center text-sm mt-1">
        Your NFT has been created and added to your collection
      </p>

      {/* NFT Preview */}
      <div className="bg-[#161B22] rounded-md mt-4 p-4">
        <Image
          width={80}
          height={60}
          // layout="fill"
          // objectFit="cover"
          src={logoUrl}
          alt="NFT Logo"
          className="h-40 max-w-[100px] rounded-md"
        />
        <div className="mt-4">
          <p className="text-[#E5E7EB] text-sm">NFT Name</p>
          <p className="font-semibold text-[#D1D5DB]">{nftName}</p>
          <p className="text-[#E5E7EB] text-sm mt-2">Description</p>
          <p className="text-[#D1D5DB]">{description}</p>
          <p className="text-[#E5E7EB] text-sm mt-2">NFT ID</p>
          <p className="text-[#8B5CF6]">{nftId}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={onShare}
          className="flex items-center justify-center w-1/2 bg-[#1F2937] hover:bg-gray-700 text-white py-2 rounded-md"
        >
          <ShareIcon style={{ color: "white" }} />
          Share
        </button>
        <button
          onClick={onMintAnother}
          className="w-1/2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-80 text-white py-2 rounded-md font-medium border-[#e5e7eb]"
        >
          <Image src={cube} alt="cube" />
          Mint Another
        </button>
      </div>
    </section>
    // </div>
  );
};

export default NFTSuccessModal;
