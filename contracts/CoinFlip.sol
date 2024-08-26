// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;
    uint256 public contractBalance;
    
    event CoinFlipped(address player, uint256 amount, bool won, bool headsChosen);

    constructor() payable {
        owner = msg.sender;
        contractBalance = msg.value;
    }

    function flip(bool heads) external payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        
        bool result = random() % 2 == 0;
        
        if (result == heads) {
            uint256 payout = msg.value * 2;
            require(contractBalance >= payout, "Contract doesn't have enough balance");
            payable(msg.sender).transfer(payout);
            contractBalance -= payout;
            emit CoinFlipped(msg.sender, msg.value, true, heads);
        } else {
            // Credit the bet amount to the contract balance when the player loses
            contractBalance += msg.value;
            emit CoinFlipped(msg.sender, msg.value, false, heads);
        }
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender)));
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 amount = contractBalance;
        contractBalance = 0;
        payable(owner).transfer(amount);
    }

    receive() external payable {
        contractBalance += msg.value;
    }

    function getContractBalance() public view returns (uint256) {
        return contractBalance;
    }
}