import "../App.css";
import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const { TextArea } = Input;

function RecoverAccount( props ) {

  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);

  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  function recoverWallet() {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    } catch (error) {
      setNonValid(true);
      return;
    }

    props.setSeedPhrase(typedSeed);
    props.setWallet(recoveredWallet.address);
    navigate("/yourwallet");
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic" >
          <BulbOutlined style={{ fontSize: "20px" }} />
            <div>
              Type your seed phrase in the field below to recover your wallet (it
              should include 12 words separated with spaces)
            </div>
        </div>
        <TextArea
          value={typedSeed}
          onChange={seedAdjust}
          rows={4}
          className="textArea"
          placeholder="Type your seed phrase here..."
        />
        <Button
          disabled={
            typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
          }
          className="frontPageButton"
          type="primary"
          onClick={()=>recoverWallet()}
        >
          Recover Wallet
        </Button>
        {
          nonValid && (
            <p
              style={{
                color: "red",
                fontWeight:"bold"
              }}
            >
              Invalid Seed Phrase
            </p>
          )             
        }
        <p 
          className="frontPageButton"
          onClick={()=>navigate("/")}
          style={{
            color:"#f9f9f9",
            cursor:"pointer"
          }}
        >
          Back Home
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;
