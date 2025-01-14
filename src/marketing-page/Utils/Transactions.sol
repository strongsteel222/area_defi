// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../../node_modules/hardhat-console/contracts/console.sol";

contract Transactions {
    uint256 transactioncount;

    event Transfer(
        address from,
        address to,
        uint amount,
        string message,
        string keyword,
        uint256 timestamp
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        string keyword;
        uint256 timestamp;
    }
    TransferStruct[] Arraytransactions;

    function Addtoblockchain(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public {
        transactioncount += 1;
        Arraytransactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                keyword,
                block.timestamp
            )
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            keyword,
            block.timestamp
        );
    }
    function Getalltransfer() public view returns (TransferStruct[] memory) {
        return Arraytransactions;
    }
    function GetTranscount() public view returns (uint256) {
        return transactioncount;
    }
}
