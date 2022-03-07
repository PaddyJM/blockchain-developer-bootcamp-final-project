// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "./ERC20Token.sol";

contract ERC20TokenRegister {
    struct TokenDetails {
        string name;
        string symbol;
        uint8 decimals;
        uint256 totalSupply;
        address tokenAddress;
    }

    TokenDetails[] public tokenRegister;

    event ERC20TokenRegistered( string name,
        string symbol,
        uint8 decimals,
        uint256 totalSupply,
        address tokenAddress);

    function registerNewERC20Token(
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        uint256 initialSupply
    ) public returns (address) {
        ERC20Token t = new ERC20Token(
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender
        );

        tokenRegister.push(TokenDetails(name, symbol, decimals, initialSupply, address(t)));

        emit ERC20TokenRegistered(name, symbol, decimals, initialSupply, address(t));

        return address(t);
    }
}