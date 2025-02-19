import Image from "next/image";
import WalletConnect from "./WalletConnect";
import logo from "@/assets/Frame.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-[100vw] px-16 py-3 bg-black">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={20} height={20} priority />
      </div>

      {/* Right: Connect Wallet Button */}
      <div className="flex flex-row justify-center items-center gap-2">
        <AccountBalanceWalletIcon />
        <WalletConnect />
      </div>
    </nav>
  );
}
