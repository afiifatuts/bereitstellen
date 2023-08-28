// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract Bereitstellen {
    string public color;
    address public deployer; // New state variable to store the deployer address

    event ColorChanged(address by, string color);

    constructor() {
        deployer = msg.sender; // Store the deployer address
    }

    modifier onlyDeployer() {
        require(msg.sender == deployer, "Can only be called by deployer");
        _;
    }

    function setColor(string memory _yourNewColor) public onlyDeployer {
        color = _yourNewColor;
        emit ColorChanged(msg.sender, _yourNewColor);
    }
}
