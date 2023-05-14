import React, { useEffect, useState } from "react";
import { Divider, Tooltip, List, Avatar, Spin, Tabs, Input, Button} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import  axios from "axios";
import logo from "../noImg.png";
import { CHAINS_CONFIG } from "../chains";
import {ethers} from "ethers";

function WalletView({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain,
}) {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [sentToAddress, setSentToAddress] = useState(null);
  const [amountToSend, setAmountToSend] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState(null);

  const items = [
    {
      key: "3",
      label: 'Tokens',
      children: (
        <>
          {tokens ? (
            <>
              <List
                bordered
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item,index) => (
                  <List.Item style={{ textAlign: "left" }} >
                    <List.Item.Meta
                      avatar={ <Avatar src={item.logo || logo} /> }
                      title={item.symbol}
                      description={item.name}
                    />
                    <div>
                      {(
                        Number(item.balance) /
                        10 ** Number(item.decimals)
                      ).toFixed(2)} {" "}
                      Tokens
                    </div>                   
                  </List.Item>
                )}
              />
            </>
          ):(
            <>
              <span>You seem to not have any tokens yet</span>
              <p className="frontPageButtom" >
                Find alt coin gems:{""}
                <a 
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  money.moralis.io
                </a>
              </p>
            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: 'NFTs',
      children: (
        <>
          {nfts ? (
            <>
              {nfts.map((e,i)=> {
                return (
                  <>
                    {e && (
                      <img
                        key={i}
                        className="nftImage"
                        alt="nftImage"
                        src={e}
                      />
                    )}
                  </>
                );
              })}
            </>
          ):(
            <>
            <span>You seem to not have any nfts yet</span>
              <p className="frontPageButtom" >
                Find alt coin gems :{" "}
                  <a 
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  money.moralis.io
                </a>
              </p>
            </>
          )}
        </>
      ),
    },
    {
      key: "1",
      label: 'Transfer',
      children:
        <>
          <h3>Native Balance </h3>
          <h1>
            {balance.toFixed(2)} {CHAINS_CONFIG[selectedChain].ticker}
          </h1>
          <div className="sendRow">
            <p style={{ width: "90px", textAlign: "left" }}>To:</p>
            <Input 
              value={sentToAddress}
              onChange={(e) => setSentToAddress(e.target.value)}
              className="sendInput" placeholder="0x..." 
            />
          </div>
          <div className="sendRow" >
            <p style={{ width:"90px", textAlign:"left" }}>Amount:</p>
            <Input
              value={amountToSend}
              onChange={(e)=> setAmountToSend(e.target.value)}
              className="sendInput"
              placeholder="Tokens you wish to send..."
            />
          </div>
          <Button
            className={`sendTokensButton ${processing ? 'sending' : ''}`}
            type="primary"
            onClick={() => sendTransaction(sentToAddress, amountToSend)}
            disabled={processing}
          >
            {processing ? <Spin size="small" /> : 'Send Tokens'}
          </Button>
          {processing && (
            <div className="processingContainer">
              {hash && (
                <Tooltip title={hash}>
                  <p>Hover for tx hash</p>
                </Tooltip>
              )}
            </div>
          )}
        </>
    }
  ]

  async function sendTransaction(to, amount) {
    const chain = CHAINS_CONFIG[selectedChain];

    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };

    setProcessing(true);
    try{
      const transaction = await wallet.sendTransaction(tx);

      setHash(transaction.hash);
      const receipt = await transaction.wait();

      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSentToAddress(null);

      if (receipt.status === 1) {
        getAccountTokens();
      } else {
        console.log("failed");
      }

    }catch(err){
      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSentToAddress(null);
    }
  }

  async function getAccountTokens() {
    setFetching(true);
  
    const res = await axios.get(`http://localhost:3001/getTokens`, {
      params: {
        userAddress: wallet,
        chain: selectedChain,
      },
    });
  
    const response = res.data;
  
    if (response?.tokens?.length > 0) {
      setTokens(response.tokens);
    }
  
    if (response?.nfts?.length > 0) {
      setNfts(response.nfts);
    }
  
    setBalance(response?.balance || 0);
  
    setFetching(false);
  }
  
  function logout() {
    setSeedPhrase(null);
    setWallet(null);
    setNfts(null);
    setTokens(null);
    setBalance(0);
    navigate("/");
  }

  useEffect(() => {
    if (!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!wallet) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChain]);
 
  return (
    <>
      <div className="content">
        <div className="logoutButton" onClick={logout} >
          <LogoutOutlined/>
        </div>
          <div className="walletName" >
            Your Wallet
          </div>
          <Tooltip 
            title={wallet} 
            style={{
              color: "#f9f9f9"
            }}
          >
          <div>
            {wallet.slice(0,4)}...{wallet.slice(38)}
          </div>           
          </Tooltip>
          <Divider
            style={{
              borderBottom: "1px solid #ffff"
            }}
          />
          {fetching ? (
          <Spin />
        ) : (
          <Tabs defaultActiveKey="1" items={items} className="walletView" />
        )}
      </div>
    </>
  );
}
export default WalletView;
