const mongoose = require('mongoose');
const crypto = require('crypto');

const generateNumericUUID = () => {
  return parseInt(crypto.randomBytes(6).toString('hex'), 16); // 12-digit numeric ID
};

const NFTSchema = new mongoose.Schema(
  {
    nftId: { 
      type: Number, 
      unique: true, 
      default: generateNumericUUID 
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String, required: true },
    ownerWallet: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("NFT", NFTSchema);
