const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const nftRoutes = require("./routes/nftRoutes");

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000","https://nft-minting-sigma.vercel.app"], // Adjust based on your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use("/api/nft", nftRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("NFT Minting Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
