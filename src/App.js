import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Token from './artifacts/contracts/ERC20Token.sol/ERC20Token.json'
import TokenRegister from './artifacts/contracts/ERC20TokenRegister.sol/ERC20TokenRegister.json'

const tokenAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"
const tokenListAddress = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"

function App() {
  // ERC20
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  // ERC20Factory
  const [name, setName] = useState()
  const [symbol, setSymbol] = useState()
  const [decimals, setDecimals] = useState()
  const [initalSupply, setInitialSupply] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // ERC20Token
  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }


  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  //ERC20TokenFactory
  async function createToken() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const tokenListContract = new ethers.Contract(tokenListAddress, TokenRegister.abi, signer)
      await tokenListContract.registerNewERC20Token(name, symbol, decimals, initalSupply);
      tokenListContract.on("ERC20TokenRegistered", (name, symbol, decimals, initialSupply, tokenAddress) => {
        console.log("Token details:")
        console.log("Name: ", name)
        console.log("Symbol: ", symbol)
        console.log("Decimals: ", decimals)
        console.log("Initial Supply: ", initialSupply)
        console.log("Token Address: ", tokenAddress)
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={x => setUserAccount(x.target.value)} placeholder="Account ID" />
        <input onChange={x => setAmount(x.target.value)} placeholder="Amount" />

        <br />
        <button onClick={createToken}>Create Token</button>
        <input onChange={x => setName(x.target.value)} placeholder="Name" />
        <input onChange={x => setSymbol(x.target.value)} placeholder="Symbol" />
        <input onChange={x => setDecimals(x.target.value)} placeholder="Decimals" />
        <input onChange={x => setInitialSupply(x.target.value)} placeholder="Initial Supply" />
      </header>
    </div>
  );
}

export default App;