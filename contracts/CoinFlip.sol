// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CoinFlip {
    address public owner;
    IERC20 public token;
    
    event CoinFlipped(address player, uint256 amount, bool won, bool headsChosen);

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    function flip(uint256 amount, bool heads) external {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(token.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        
        token.transferFrom(msg.sender, address(this), amount);
        
        bool result = random() % 2 == 0;
        
        if (result == heads) {
            token.transfer(msg.sender, amount * 2);
            emit CoinFlipped(msg.sender, amount, true, heads);
        } else {
            emit CoinFlipped(msg.sender, amount, false, heads);
        }
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender)));
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = token.balanceOf(address(this));
        token.transfer(owner, balance);
    }
}