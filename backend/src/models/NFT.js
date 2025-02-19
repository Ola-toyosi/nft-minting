const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    nftId: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String, required: true },
    ownerWallet: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('NFT', NFTSchema);
