const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/getTokens", async (req, res) => {

  const { userAddress, chain } = req.query;

  const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
    chain: chain,
    address: userAddress,
  });

  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: chain,
    address: userAddress,
    mediaItems: true,
  });

  const balance = await Moralis.EvmApi.balance.getNativeBalance({
    chain: chain,
    address: userAddress,
  });

  const jsonResponse = {
    tokens: tokens.raw,
    nfts: nfts.raw,
    balance: balance.raw.balance,
  }

  return res.status(200).json(jsonResponse);
});


Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  console.log("Moralis server started successfully!");
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
}).catch((error) => {
  console.log("Moralis server failed to start:", error);
});

//http://localhost:3001/getTokens?userAddress=0x1FfDC7Fd89614156A85ED3600f98f47523babe9d&chain=0x1