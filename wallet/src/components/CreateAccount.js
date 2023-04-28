import React from "react";
import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";


function CreateAccount( props ) {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
    // console.log(mnemonic);
  }

  function setWalletAndMnemonic() {
    props.setSeedPhrase(newSeedPhrase);
    props.setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic" >
          <ExclamationCircleOutlined style={{fontSize:"20px"}} />
          <div>
            Once you generate the seed phrase save it securely,
            inorder to recover your wallet in future.
          </div>
        </div>
        <Button 
          onClick={()=>generateWallet()}
          className="frontPageButton"
          type="primary" 
        >
          Generate Seed Phrase
        </Button>
        <Card 
          // className="seedPhraseContainer" 
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            padding: "10px",
            color: "#f9f9f9",
            fontSize: "1rem",
            width: "310px",
            minHeight: "160px",
            marginTop: "30px"
          }}
        >
          {newSeedPhrase && <pre style={{whiteSpace: "pre-wrap"}}>{newSeedPhrase}</pre>}
        </Card>
        <Button 
          onClick={()=>setWalletAndMnemonic()}
          className="frontPageButton"
          type="default" 
        >
          Open Your New Wallet
        </Button>
        <p 
          className="frontPageBottom" 
          onClick={()=>navigate("/")}
          style={{
            color:"#f9f9f9"
          }} 
        >
          Back Home
        </p>
      </div>
    </>
  );
}

export default CreateAccount;
