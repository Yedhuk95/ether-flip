# Ether Flip

Ether Flip is a decentralized application (dApp) built on the Ethereum blockchain that allows users to bet Sepolia ETH on a coin flip game. The game is probably fair and runs entirely on-chain.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Usage](#usage)
4. [Smart Contract](#smart-contract)
5. [Frontend](#frontend)
6. [Security Considerations](#security-considerations)
7. [Contributing](#contributing)

## Features

- Bet Sepolia ETH on coin flips (heads or tails)
- Probably fair results using blockchain-based randomness
- Double your bet on winning flips
- Accumulation of lost bets in the contract balance
- Real-time balance updates for both user and contract
- Etherscan transaction links for transparency

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MetaMask browser extension
- Sepolia ETH for betting and gas fees

## Usage

1. Start the development server:

2. Open your browser and navigate to `http://localhost:3000`

3. Connect your MetaMask wallet to the Sepolia testnet

4. Enter the amount you want to bet and choose heads or tails

5. Click "Flip Coin" to place your bet

6. Wait for the transaction to be confirmed and see the result

## Smart Contract

The `CoinFlip.sol` contract is the core of the game. Key functions include:

- `flip(bool heads)`: Main function to place a bet
- `withdraw()`: Allows the owner to withdraw the contract balance
- `getContractBalance()`: Returns the current contract balance

## Frontend

The frontend is built with React and uses Web3.js to interact with the Ethereum blockchain. Key components include:

- `App.js`: Main component handling game logic and UI
- `TransactionLink.js`: Component for displaying Etherscan links


## Security Considerations

- The current random number generation method is not secure for production use. Consider implementing a more robust solution like Chainlink VRF for real-world applications.
- Ensure proper access controls are in place for admin functions like withdrawals.
- Consider implementing a maximum bet limit to manage risk.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
