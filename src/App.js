import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';
import styled, { css, keyframes } from 'styled-components';
import { FaEthereum } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const CONTRACT_ADDRESS = '0x5017D26FA546a1F469d640483f766C4664BeFB69';
const TOKEN_ADDRESS = '0x6718d3cBE780CaB35cd7eC623f8152Cd4A7289Bd';
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "won",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "headsChosen",
        "type": "bool"
      }
    ],
    "name": "CoinFlipped",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "heads",
        "type": "bool"
      }
    ],
    "name": "flip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; 
const TOKEN_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; // Add ERC20 token ABI here

const ethereumGradient = 'linear-gradient(135deg, #6b7cb9 0%, #3c3c3d 100%)';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: ${ethereumGradient};
  color: white;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Balance = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #dcdcdc;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const InputSelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px; 
  width: 100%;
  max-width: 500px; 
  margin-bottom: 1rem;
`;
const Input = styled.input`
   flex: 1;
  padding: 0.75rem;
  border: 1px solid #3c3c3d;
  border-radius: 50px;
  font-size: 1.1rem;
  background-color: #f8f8f8;
  color: #2c3e50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    border-color: #6b7cb9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 8px rgba(107, 124, 185, 0.4);
    outline: none;
  }
`;

const Select = styled.select`
   flex: 1; 
  padding: 0.75rem;
  border: 1px solid #3c3c3d;
  border-radius: 50px;
  font-size: 1.1rem;
  background-color: #f8f8f8;
  color: #2c3e50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    border-color: #6b7cb9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 8px rgba(107, 124, 185, 0.4);
    outline: none;
  }
`;

const flipAnimation = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(180deg);
  }
  100% {
    transform: rotateX(360deg);
}
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  margin: 1rem;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  background-image: ${ethereumGradient};
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background-image: ${ethereumGradient};
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-image: linear-gradient(45deg, #bdc3c7, #ecf0f1);
    box-shadow: none;
  }



`;
const Coin = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0c040;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  margin: 20px 0;
  transform-style: preserve-3d;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3);
  background-image: ${ethereumGradient};
  animation: ${props => props.flipping ? flipAnimation : 'none'} 1s linear infinite;
  &:before {
    position: absolute;
    transform: translateZ(50px); /* Move text in front */
    color: #2c3e50;
  }

  &:after {
    position: absolute;
    transform: rotateY(180deg) translateZ(50px); /* Back side text */
    color: #2c3e50;
  }
`;

const Result = styled.p`
  font-size: 2rem;
  margin-top: 1rem;
  font-weight: bold;
  color: #8e44ad;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  background: linear-gradient(45deg, #8e44ad, #3498db);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 5px rgba(142, 68, 173, 0.7), 0 0 10px rgba(142, 68, 173, 0.5), 0 0 15px rgba(52, 152, 219, 0.3);

`;

const EthereumIcon = styled(FaEthereum)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [token, setToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState('heads');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [balance, setBalance] = useState('0');
  const [flipping, setFlipping] = useState(false);
  const [displayResult, setDisplayResult] = useState('Ξ');

  useEffect(() => {
    initWeb3();
  }, []);

  async function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setContract(contractInstance);

        const tokenInstance = new web3Instance.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
        setToken(tokenInstance);

        const accounts = await web3Instance.eth.getAccounts();
        updateBalance(accounts[0], tokenInstance);

        window.ethereum.on('accountsChanged', (accounts) => updateBalance(accounts[0], tokenInstance));

        toast.success('Connected to Web3 successfully');
      } catch (error) {
        console.error('Failed to connect to Web3:', error);
        toast.error('Failed to connect to Web3. Please try again.');
      }
    } else {
      toast.error('Please install MetaMask!');
    }
  }

  async function updateBalance(address, tokenInstance) {
    try{
    const balance = await tokenInstance.methods.balanceOf(address).call();
    setBalance(web3.utils.fromWei(balance, 'ether'));
    }
    catch(error){
      console.error("error using updateBalance")
    }
  }



  async function flipCoin() {
    if (!web3 || !contract) {
      toast.error('Web3 is not initialized. Please connect first.');
      return;
    }

    if (!amount) {
      toast.error('Please enter an amount to bet.');
      return;
    }

    setLoading(true);
    setResult(null);
    setFlipping(true);
    setDisplayResult('')
    try {
      const accounts = await web3.eth.getAccounts();
      const amountWei = web3.utils.toWei(amount, 'ether');

      // Approve the contract to spend tokens
      await token.methods.approve(CONTRACT_ADDRESS, amountWei).send({ from: accounts[0] });

      // Flip the coin
      const result = await contract.methods.flip(amountWei, side === 'heads').send({ from: accounts[0] });
      console.log(result)
      // Check the event emitted by the contract to determine the result
      const event = result.events.CoinFlipped;
      const won = event.returnValues.won;
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult(won);
      setDisplayResult(won ? (side.toUpperCase()==='HEADS'? 'Heads': 'Tails'):(side.toUpperCase()==='HEADS'? 'Tails': 'Heads'))
      updateBalance(accounts[0], token);

      toast.success(`Coin flipped! You ${won ? 'won' : 'lost'}!`);
    } catch (error) {
      console.error('Error flipping coin:', error);
      toast.error('Failed to flip coin. Please try again.');
    }
    setLoading(false);
    
    setFlipping(false);
  }

  return (
    <AppWrapper>
      <EthereumIcon />
      <Title>Ether Flip</Title>
      <Balance>Your ETH balance: {balance}</Balance>
      <InputSelectWrapper>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to bet (ETH)"
      />
      <Select value={side} onChange={(e) => setSide(e.target.value)}>
        <option value="heads">Heads</option>
        <option value="tails">Tails</option>
      </Select>
      </InputSelectWrapper>
      
      <Button onClick={flipCoin} disabled={loading}>
        {loading ? 'Flipping...' : 'Flip Coin'}
      </Button>
      <Coin flipping={flipping}>{displayResult}</Coin>
      {result !== null && (
        <Result>You {result ? 'won' : 'lost'}!</Result>
      )}
      <ToastContainer />
    </AppWrapper>
  );
}

export default App;