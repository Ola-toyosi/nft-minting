"use client";
import Image from "next/image";
import WalletConnect from "@/components/WalletConnect";
import NFTMintForm from "@/components/NFTMintForm";
import NFTGallery from "@/components/NFTGallery";
import Navbar from "@/components/Navbar";
import NFTSuccessModal from "@/components/NFTSuccessModal";
import Hero from "@/components/Hero";

type NFTData = {
  name: string;
  description: string;
  image: File | string; // Adjust based on how you're handling images
};

export default function Home() {
  const handleMintNFT = async (nftData: NFTData) => {
    console.log("Minting NFT:", nftData);
    // Logic to interact with the backend will go here
    
  };
  return (
    <div className="flex flex-col bg-gradient-hero  px-4 items-center  min-h-screen py-0 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center">
        <Hero />
        <div className=" bg-none p-6 py-12 w-full">
          <div className="mx-auto mt-8">
            <NFTMintForm onMint={handleMintNFT} />
          </div>
        </div>
        <NFTSuccessModal
          nftName="Celestial Harmony #004"
          description="A mesmerizing blend of cosmic elements and digital artistry"
          nftId="#8F3E2A1D9C"
          onMintAnother={() => console.log("Minting another NFT...")}
          onShare={() => console.log("Sharing NFT...")}
        />
      </main>
    </div>
  );
}
