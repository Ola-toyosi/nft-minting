"use client";
import NFTMintForm from "@/components/NFTMintForm";
import NFTGallery from "@/components/NFTGallery";
import Navbar from "@/components/Navbar";
import NFTSuccessModal from "@/components/NFTSuccessModal";
import Hero from "@/components/Hero";
import axios from "axios";
import { useState } from "react";
import { useNFTMint } from "@/hooks/useNFTMint";

type NFTData = {
  name: string;
  description: string;
  logoUrl: string;
  ownerWallet?: string;
  nftId?: string;
};

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [nftSubmitData, setNFTSubmitData] = useState<NFTData | null>(null);
  const [isMintSuccess, setIsMintSuccess] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const { tokenExists, refetch, mintNFT, getReceipt } = useNFTMint();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const checkUniqueId = async (tokenId: number): Promise<number> => {
    // let tokenId;
    do {
      // tokenId = Math.floor(Math.random() * 100000);
      await refetch();
    } while (tokenExists); // Ensure it's unique
    return tokenId;
  };

  const handleMintNFT = async (nftData: NFTData) => {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }
    // console.log(walletAddress);
    const fullNFTData: NFTData = { ...nftData, ownerWallet: walletAddress };
    if (!isMinting) {
      setIsMinting(true);
    }
    // console.log("Minting NFT:", fullNFTData);
    try {
      const response = await axios.post(`${backendUrl}api/nft`, fullNFTData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Saved Successfully:", response.data.nft);

      try {
        const tokenId = await checkUniqueId(response.data.nft.nftId);

        const metadataUrl = `${backendUrl}api/nft/${tokenId}`;

        // Step 3: Mint NFT on the blockchain
        const mintTx = await mintNFT(tokenId, metadataUrl);
        // await mintTx.wait(); // Wait for confirmation

        console.log("Transaction successful:", mintTx);

        if (mintTx) {
          const txReceipt = await getReceipt(mintTx);

          console.log("Transaction successful:", txReceipt);
        }
      } catch (err) {
        console.log("Error while minting onChain:", err);
      }

      setNFTSubmitData(response.data.nft);
      setIsMintSuccess(true);
    } catch (error) {
      console.error("Minting failed:", error);
    } finally {
      setIsMinting(false);
    }
  };

  const handleMintAnother = () => {
    setNFTSubmitData(null);
    setIsMintSuccess(false); // Hide success modal & reset form
  };

  return (
    <div className="flex flex-col bg-gradient-hero px-4 items-center min-h-screen max-w-screen py-0 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar onWalletChange={setWalletAddress} />
      <main className="flex flex-col items-center px-8 max-w-[100vw]">
        <Hero />
        <div className="bg-none p-6 py-12 w-full">
          <div className="mx-auto mt-8">
            {!isMintSuccess && <NFTMintForm onMint={handleMintNFT} />}
          </div>
        </div>

        {/* Show Success Modal only if minting was successful */}
        {isMintSuccess && nftSubmitData && (
          <NFTSuccessModal
            nftName={nftSubmitData.name}
            description={nftSubmitData.description}
            logoUrl={nftSubmitData.logoUrl}
            nftId={nftSubmitData.nftId}
            onMintAnother={handleMintAnother}
            onShare={() => console.log("Sharing NFT...")}
          />
        )}
        <NFTGallery ownerWallet={walletAddress} />
      </main>
    </div>
  );
}
