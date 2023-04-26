import "./App.css";
import { Typography } from 'antd';
import { useState } from "react";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
// import logo from "./assets/logo1.png"

const { Title, Text } = Typography;

function App() {
  const [selectdChain, setSelectdChain] = useState("0x1");

  return (
    <div className="App">
      <header>
        {/* <img src={logo} alt="logo" className="headerlogo" /> */}
        <Title 
          level={3} 
          className="title"
          style={{
            color:"#00ffff"
          }}
        >
          Lumitrix
          <Text 
            level={5}                         className="subtitle"
            italic
          >
            Wallet
          </Text>
        </Title>
        <Select
          onChange={(val)=>setSelectdChain(val)}
          value={selectdChain}
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
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
