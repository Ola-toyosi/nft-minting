const express = require("express");
const NFT = require("../models/NFT");

const router = express.Router();

// Utility function to log errors
const logError = (error, location) => {
  console.error(`❌ [${location}] Error:`, error.message);
  console.error(error.stack);
};

// @route   POST /nft
// @desc    Mint a new NFT
router.post("/", async (req, res) => {
  try {
    const { name, description, logoUrl, ownerWallet } = req.body;

    // Validate request body
    if (!name || !description || !logoUrl || !ownerWallet) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if NFT ID already exists
    // const existingNFT = await NFT.findOne({ nftId });
    // if (existingNFT) {
    //     return res.status(409).json({ success: false, message: "NFT ID already exists" });
    // }

    // Create and save NFT
    const nft = new NFT({ name, description, logoUrl, ownerWallet });
    await nft.save();

    res
      .status(201)
      .json({ success: true, message: "NFT Minted Successfully", nft });
  } catch (error) {
    logError(error, "Mint NFT");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route   GET /nft/:id
// @desc    Fetch NFT by ID
router.get("/:id", async (req, res) => {
  try {
    const nft = await NFT.findOne({ nftId: req.params.id });

    if (!nft) {
      return res.status(404).json({ success: false, message: "NFT Not Found" });
    }

    res.json({ success: true, nft });
  } catch (error) {
    logError(error, "Get NFT by ID");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route   GET /nft/gallery/:walletAddress
// @desc    Fetch all NFTs for a wallet
router.get("/gallery/:walletAddress", async (req, res) => {
  try {
    const nfts = await NFT.find({ ownerWallet: req.params.walletAddress });

    res.json({ success: true, nfts });
  } catch (error) {
    logError(error, "Get NFTs by Wallet Address");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
