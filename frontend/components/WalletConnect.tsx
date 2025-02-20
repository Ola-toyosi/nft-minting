import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";

const WalletConnect = ({ onWalletChange }: { onWalletChange: (wallet: string | null) => void }) => {
  const { address, isConnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
      console.log(walletAddress)
      onWalletChange(address);
    } else {
      setWalletAddress(null);
      onWalletChange(null);
    }
  }, [isConnected, address, onWalletChange]);

  return (
    <div className="flex justify-center items-center my-auto">
      <ConnectButton />
    </div>
  );
};

export default WalletConnect;
