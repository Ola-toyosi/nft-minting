"use client";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
// import { useRouter } from "next/navigation";

const Hero = () => {
  // const router = useRouter();

  const handleStartCreating = () => {
    // Scrolls smoothly to the NFTMintForm section
    document.getElementById("nft-mint-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWatchDemo = () => {
    // Opens the GitHub README.md link in a new tab
    window.open("https://github.com/Ola-toyosi/nft-minting/blob/main/frontend/README.md", "_blank");
  };

  return (
    <section className="flex flex-col items-center text-center justify-center h-[70vh] w-[100vw] bg-transparent text-white px-4 py-0">
      <h1 className="text-5xl font-bold md:text-6xl">
        Discover & Collect <br /> Extraordinary NFTs
      </h1>
      <p className="text-lg text-gray-400 mt-4 max-w-2xl">
        Enter the world of digital art and collectibles. Explore unique NFTs
        created by artists worldwide.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleStartCreating}
          className="flex items-center gap-2 px-6 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:opacity-90"
        >
          <RocketLaunchIcon />
          Start Creating
        </button>
        <button
          onClick={handleWatchDemo}
          className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-lg bg-gray-800 text-white shadow-lg hover:bg-gray-700"
        >
          <PlayCircleIcon />
          Watch Demo
        </button>
      </div>
    </section>
  );
};

export default Hero;
