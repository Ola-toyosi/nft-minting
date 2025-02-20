import { useReadContract, useWriteContract } from "wagmi";
import contractABI from "@/contracts/NFT_ABI.json";
import { getTxpoolContent } from "viem/actions";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { config } from "@/config";

const contractAddress = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";

export function useNFTMint() {
  // const { writeContract } = useWriteContract();

  const { data: tokenExists, refetch } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "checkId",
    args: [],
  });

  // Mint function using `writeContract`
  const mintNFT = async (tokenId: number, metadataUrl: string) => {
    try {
      const tx = await writeContract(config, {
        address: contractAddress,
        abi: contractABI,
        functionName: "mint",
        args: [tokenId, metadataUrl],
      });
      if (!tx) {
        console.error("Transaction hash is undefined.");
        return;
      }

      console.log("Transaction submitted! Hash:", tx);
      console.log("mint-done");
      return tx; // You can await tx.wait() in your main function if needed
    } catch (error) {
      console.error("Minting failed:", error);
      throw error;
    }
  };

  const getReceipt = async (tx: `0x${string}`) => {
    try {
      const transactionReceipt = waitForTransactionReceipt(config, {
        hash: tx,
      });
      return transactionReceipt;
    } catch (err) {
      console.log("Dee");
    }
  };

  return { tokenExists, refetch, mintNFT, getReceipt };
}
