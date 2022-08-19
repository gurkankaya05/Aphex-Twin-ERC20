import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { ethers } from 'ethers';


import './App.css'
import { useAphexToken } from './hooks/useAphexToken';
import { useAphexContract } from './hooks/useAphexContract';
import aphex from './img/aphex.png';






function App() {
  const aphexToken = useAphexToken();
  const aphexTwin = useAphexContract();
  const [approveStatus,setApproveStatus] = useState("");
  const[value,setValue] = useState("");  
  const[to,setTo] = useState("");
  const[to2,setTo2] = useState("")
  const[transferStatus,setTransferStatus]  = useState(false);
  const[amount,setAmount] = useState("");
  const[balance,setBalance] = useState("");
  const [contractBalance, setContractBalance] = useState(null);
  const[account,setAccount] = useState();
  const [symbol,setSymbol] = useState("")
  const[transferFromStatus,setTransferFromStatus] = useState(false)
//Wallet Function
  const connectWallet= async() =>{
    try {
      if(!window.ethereum) return alert("Please Install Metamask!");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const account =await provider.send("eth_requestAccounts");
      setAccount(account[0]);
      
    } catch (error) {
      throw new Error("No eth Object!");
    }
  }

  const checkIfWalletConnected = async () => {
    try {
    if (!window.ethereum) return alert("Plase install Metamask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const account = await provider.send("eth_accounts");
    if (account.length) {
    setAccount(account[0])
    }
    else {
    console.log("No Accounts Found.")
    }
    } catch (error) {
    console.log(error)
  
    }
  }
//Wallet Function

const transfer = async() =>{
  ethers.utils.parseEther(amount)
  setTransferStatus(true)
  try {
    const txn = await aphexToken.transfer(to,amount);
    await txn.wait();
    setTransferStatus(false)
  } catch (error) {
    setTransferStatus(false)
  }
}


const getBalance = async() => {
  const result = await aphexTwin.getBalances(to);
  setBalance(result);
}

const getContractBalance = async() => {
  try {
    const result = await aphexTwin.getContractBalances();
    ethers.utils.formatEther(result);
    setContractBalance(result);
    console.log(result);
  } catch (error) {
    
  }

}
const approve = async() =>{
  setApproveStatus(true);
  try {
    const txn = await aphexToken.approve(to,amount);
    await txn.wait();
    setApproveStatus(false);
  } catch  {
    setApproveStatus(false);
  }
}

const _symbol = async() =>{
  const result = await aphexToken.symbol();
  setSymbol(result);

}

const _transferFrom = async() =>{
  setTransferFromStatus(true)
  try {
    const txn = await aphexToken.transferFrom(to,to2,amount);
    await txn.wait();
    setTransferFromStatus(false);
  } catch (error) {
    setTransferFromStatus(false)
    
  }
 
}

  useEffect(() => {
    checkIfWalletConnected();
  },[account])



  return (
    <div>
      
      <img src={aphex} width={450}/>
      

       <div className="App">
  
  <button onClick={connectWallet}>{!account ? "Connect Wallet 🔐" : account}   </button>
     <br/>
     <div className='input-group'>
     
      <input className='input-1' value={to} placeholder="Enter Wallet Address" onChange={(e) => setTo(e.target.value)}/><br/>
      <br/>
      <input className='input-2' value = {to2} placeholder="Enter Wallet Address 2" onChange={(e) => setTo2(e.target.value)} />
      <br/>
      <input className='input-2' value = {amount} placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
     </div>
     <div><button onClick={transfer}> Transfer Token 💸</button></div> <br/>
     <div> <button onClick={getBalance}>Get Balance 🤑 </button></div> <br/>
     <div> <button onClick={getContractBalance}> Contract Balance 💰 </button> </div> <br/>
     {/* <div><button onClick={approve}>Approve ✅ </button></div> */}
     <div><button onClick={_transferFrom}> Transfer From ✅</button></div>
    
      <p>{transferStatus ? "Transaction waiting..." :""} </p>
      <p>{approveStatus ? "Approving..." : ""}</p>
      <p>{transferFromStatus ? "Receiving..." : ""}</p>
      <h4>{!balance ? "" : ` Balance : ${ethers.utils.formatEther(balance)} APH` } </h4>
      {/* <h4>Contract Balance : {contractBalance}</h4> */}
      <h4>{!contractBalance ? ""  : `Contrat Balance : ${ethers.utils.formatEther(contractBalance)} APH`}</h4>


      

</div>
  </div>
   
  )
}

export default App
