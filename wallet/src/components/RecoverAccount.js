import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const { TextArea } = Input;

function RecoverAccount( props ) {

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
          rows={4}
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
          placeholder="Type your seed phrase here..."
        />
        <Button
          className="frontPageButton"
          type="primary"
        >
          Recover Wallet
        </Button>
      </div>
    </>
  );
}

export default RecoverAccount;
