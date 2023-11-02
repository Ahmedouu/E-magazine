// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// in this version only the owner of the kiosk can add a magazine and get rewarded like the delivery guy when the magazine

contract MagazineStore {
    struct Magazine {
        uint id;
        string title;
        string publisher;
        uint price;
        address seller;
        bool available;
    }

    mapping (uint => Magazine) public magazines;
    uint public magazineCount;

    event MagazineSold(uint id, address buyer, address seller, uint price);

    constructor() {
        addMagazine("National Geographic", "National Geographic Partners", 1 ether);
        addMagazine("Time", "Meredith Corporation", 2 ether);
        addMagazine("The Economist", "The Economist Group", 3 ether);
    }
    

    function addMagazine(string memory _title, string memory _publisher, uint _price) public {
        require(bytes(_title).length > 0);
        require(bytes(_publisher).length > 0);
        require(_price > 0);
        magazineCount++;
        magazines[magazineCount] = Magazine(magazineCount, _title, _publisher, _price, msg.sender, true);
    }

    function buyMagazine(uint _id) public payable {
    require(_id > 0 && _id <= magazineCount, "Invalid magazine ID");
    Magazine storage _magazine = magazines[_id];
    require(_magazine.available == true, "Magazine is not available");
    require(msg.sender != _magazine.seller, "You cannot buy your own magazine");
    require(msg.value == _magazine.price, "Sent ether does not match the magazine price");

    // Update magazine availability and emit event
    magazines[_id].available = false;
    emit MagazineSold(_id, msg.sender, _magazine.seller, _magazine.price);

    // Perform Ether transfers
    (bool successSeller, ) = payable(_magazine.seller).call{value: msg.value * 9 / 10}("");
    require(successSeller, "Transfer to seller failed.");

    (bool successDelivery, ) = payable(address(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB)).call{value: msg.value / 10}(""); // change the address here to match one of your addresses
    require(successDelivery, "Transfer to delivery service failed.");
}

}
