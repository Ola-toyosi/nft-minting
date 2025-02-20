"use client";

import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import {
  cookieToInitialState,
  WagmiProvider,
  type Config,
  createConfig,
  http,
} from "wagmi";
import { RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import { sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "nft-minting",
  description: "NFT Minting",
  url: "https://appkitexampleapp.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, sepolia],
  defaultNetwork: sepolia,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: true,
    emailShowWallets: true,
    socials: ["google", "x"],
  },
  themeMode: "light",
});

console.log(modal);

// Custom Theme
const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: "rgba(0, 0, 0, 0.6)",
  },
  colors: {
    accentColor: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)", // Pink to purple gradient
    accentColorForeground: "#FFFFFF",
    actionButtonBorder: "#1F2937",
    actionButtonBorderMobile: "#1F2937",
    actionButtonSecondaryBackground: "#374151",
    closeButton: "#9CA3AF",
    closeButtonBackground: "transparent",
    connectButtonBackground: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)", // Match the button style
    connectButtonBackgroundError: "#EF4444",
    connectButtonInnerBackground: "#111827",
    connectButtonText: "#FFFFFF",
    connectButtonTextError: "#FFFFFF",
    connectionIndicator: "#8B5CF6", // Purple highlight
    downloadBottomCardBackground: "#111827",
    downloadTopCardBackground: "#1F2937",
    error: "#EF4444",
    generalBorder: "#374151",
    generalBorderDim: "#1F2937",
    menuItemBackground: "#1E1E2E",
    modalBackdrop: "rgba(0, 0, 0, 0.6)",
    modalBackground: "#111827",
    modalBorder: "#374151",
    modalText: "#FFFFFF",
    modalTextDim: "#9CA3AF",
    modalTextSecondary: "#E5E7EB",
    profileAction: "#4B5563",
    profileActionHover: "#6B7280",
    profileForeground: "#D1D5DB",
    selectedOptionBorder: "#8B5CF6", // Purple for selected items
    standby: "#F59E0B",
  },
  fonts: {
    body: "Inter, sans-serif",
  },
  radii: {
    actionButton: "12px",
    connectButton: "24px", // Rounded button
    menuButton: "12px",
    modal: "16px",
    modalMobile: "12px",
  },
  shadows: {
    connectButton: "0px 4px 10px rgba(139, 92, 246, 0.2)", // Glow effect to match purple theme
    dialog: "0px 10px 20px rgba(0, 0, 0, 0.25)",
    profileDetailsAction: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    selectedOption: "0px 0px 10px rgba(139, 92, 246, 0.5)",
    selectedWallet: "0px 0px 12px rgba(139, 92, 246, 0.6)",
    walletLogo: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );
  // Set up queryClient
  const queryClient = useMemo(() => new QueryClient(), []); // Prevent re-creation

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={myCustomTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
