import "./App.css";
import { Typography } from 'antd';
import { useState } from "react";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import CreateAccount from "./components/CreateAccount";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletView"

const { Title, Text } = Typography;

function App() {

  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");

  return (
    <div className="App">
      <header>
        <Title 
          level={3} 
          className="title"
          style={{
            color:"#f9f9f9"
          }}
        >
          Lumitrix
          <Text 
            level={5}                         
            className="subtitle"
            italic
          >
            Wallet
          </Text>
        </Title>
        <Select
          onChange={(val)=>setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1"
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881"
            },
            {
              label: "Polygon",
              value: "0x89"
            },
            {
              label: "Avalanche",
              value: "0xa86a"
            },
          ]}
            className="dropdown"
        >
        </Select>
      </header>
      { wallet && seedPhrase ?
        <Routes>
          <Route 
            path="/yourwallet" 
            element={
              <WalletView
                wallet = {wallet}
                setWallet = {setWallet}
                seedPhrase = {seedPhrase}
                setSeedPhrase = {setSeedPhrase}
                selectedChain = {selectedChain}
              />
            } 
          />
        </Routes>
        :
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route 
          path="/recover" 
          element={
            <RecoverAccount
              setSeedPhrase={setSeedPhrase}
              setWallet={setWallet}
            />
          } 
        />
        <Route 
          path="/yourwallet" 
          element={
            <CreateAccount 
              setSeedPhrase={setSeedPhrase} 
              setWallet={setWallet} 
            />
          } 
        />
      </Routes>
      }
    </div>
  );
}

export default App;
