import React from "react";
import wallet from "../assets/lumitrix-logo.png"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <div className="content">
        <img src={wallet} alt="logo" className="frontPageLogo" />
        <h2>Welcome to your</h2>
        <h3 className="h3" >Web3 wallet!👋</h3>
        <h4 className="h4" >Your Trusted Partner for Safe and Secure Crypto Transactions 💰</h4>
        <Button
          onClick={()=>navigate("/yourwallet")}
          className="frontPageButton"
          type="primary"
        >
          Create a Wallet
        </Button>
        <Button
          onClick={()=>navigate("/recover")}
          className="frontPageButton"
          type="default"
        >
          Sign in with a Seed Phrase
        </Button>
      </div>
    </>
  );
}

export default Home;
