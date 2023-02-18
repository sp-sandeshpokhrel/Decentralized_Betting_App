import './App.css';
import NavBar from './components/NavBar';
import Bets from './components/Bets';
import UserBets from './components/UserBets';
import { useState } from 'react';


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null)

  return (
    <div className="App">
      <NavBar isConnected={isConnected} setIsConnected={setIsConnected} setContract={setContract} />
      {isConnected ? <>
        <Bets contract={contract} />
        <UserBets contract={contract} />
      </> :
        "Connect your Wallet to get Access to betting and your bets"
      }
    </div>
  );
}

export default App;
