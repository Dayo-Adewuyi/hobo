// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import './IHobo.sol';

contract BuyHobo{

constructor(address _tokenAddress, uint256 _price) {
    tokenAddress = _tokenAddress;
    price = _price;
    token = IERC20(_tokenAddress);
    owner = msg.sender;
}


    address public owner;
    IERC20 public token;
    uint256 public price;
    address public tokenAddress;
    


    modifier onlyOwner{
        require(msg.sender == owner, "only owner can call function");
        _;
    }

function buyHoboToken(uint256 _amount) public payable{
    // the value of ether that should be equal or greater than tokenPrice * amount;
          uint256 _requiredAmount = price * _amount;
    require(msg.value >= _requiredAmount, "Ether sent is incorrect");
    // total tokens + amount <= 10000, otherwise revert the transaction
          uint256 amountWithDecimals = _amount * 10**18;

    require(token.balanceOf(address(this)) >= amountWithDecimals, "Not enough tokens in the reserve");
    require(token.transfer(msg.sender, amountWithDecimals), "Transfer failed");
}

 
 function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "Nothing to withdraw, contract balance empty");
        
        address _owner = msg.sender;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
      }
    

function updatePrice(uint256 _price) public onlyOwner{
    price = _price;

}   

function updateOwner(address _owner) public onlyOwner{
    owner = _owner;

}

 // Function to receive Ether. msg.data must be empty
      receive() external payable {}

      // Fallback function is called when msg.data is not empty
      fallback() external payable {}


   
}