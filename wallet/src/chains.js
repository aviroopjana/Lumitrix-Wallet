require("dotenv").config();

const Ethereum = {
    hex: '0x1',
    name: 'Ethereum',
    rpcUrl: '',
    ticker: "ETH"
};

const MumbaiTestnet = {
    hex: '0x13881',
    name: 'Mumbai Testnet',
    rpcUrl: process.env.ALCHEMY_MUMBAI_RPC_URL,
    ticker: "MATIC"
};

const Polygon = {
    hex: '0x89',
    name: 'Polygon',
    rpcUrl: '',
    ticker: "MATIC"
}

const Avalanche = {
    hex: '0xa86a',
    name: 'Avalanche',
    rpcUrl: '',
    ticker: 'AVAX'
};

export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0x13881": MumbaiTestnet,
    "0xa86a": Avalanche,
    "0x89": Polygon
};