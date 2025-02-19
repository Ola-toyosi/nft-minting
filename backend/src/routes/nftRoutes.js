const express = require('express');
const NFT = require('../models/NFT');

const router = express.Router();

// @route   POST /nft
// @desc    Mint a new NFT
router.post('/', async (req, res) => {
    try {
        const { nftId, name, description, logoUrl, ownerWallet } = req.body;

        // Ensure NFT ID is unique
        const existingNFT = await NFT.findOne({ nftId });
        if (existingNFT) {
            return res.status(400).json({ message: "NFT ID already exists" });
        }

        const nft = new NFT({ nftId, name, description, logoUrl, ownerWallet });
        await nft.save();

        res.status(201).json({ message: "NFT Minted Successfully", nft });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   GET /nft/:id
// @desc    Fetch NFT by ID
router.get('/:id', async (req, res) => {
    try {
        const nft = await NFT.findOne({ nftId: req.params.id });
        if (!nft) return res.status(404).json({ message: "NFT Not Found" });

        res.json(nft);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   GET /nft/gallery/:walletAddress
// @desc    Fetch all NFTs for a wallet
router.get('/gallery/:walletAddress', async (req, res) => {
    try {
        const nfts = await NFT.find({ ownerWallet: req.params.walletAddress });
        res.json(nfts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
