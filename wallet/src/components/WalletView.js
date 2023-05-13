import React, { useEffect, useState } from "react";
import { Divider, Tooltip, List, Avatar, Spin, Tabs, Input, Button} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import  axios from "axios";
import logo from "../noImg.png";
import { CHAINS_CONFIG } from "../chains";


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
            <Input className="sendInput" placeholder="0x..." />
          </div>
          <div className="sendRow" >
            <p style={{ width:"90px", textAlign:"left" }}>Amount:</p>
            <Input
              className="sendInput"
              placeholder="Tokens you wish to send..."
            />
          </div>
          <Button className="sendTokensButton" type="primary">
            <span>Send Tokens</span>
          </Button>
        </>
    }
  ]

  // async function getAccountTokens() {
  //   setFetching(true);

  //   const res = await axios.get(`http://localhost:3001/getTokens`, {
  //     params: {
  //       userAddress: wallet,
  //       chain: selectedChain,
  //     },
  //   });

  //   const response = res.data;

  //   if (response.tokens.length > 0) {
  //     setTokens(response.tokens);
  //   }

  //   if (response.nfts.length > 0) {
  //     setNfts(response.nfts);
  //   }

  //   setBalance(response.balance);

  //   setFetching(false);
  // }

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
  }, []);

  useEffect(() => {
    if (!wallet) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
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
