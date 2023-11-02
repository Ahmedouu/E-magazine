# E-magazine
An Ethereum based magazine kiosk, it's basically like a vending machine but for magazines

The idea here is to have an app that allows for customers to order a journal then have the transactions fees devided between the seller and the delievery 90/10.
Anyone can add a book to the kiosk then they become the seller and entitled to 90, of course a seller cannot buy his own book that would be illegal, they would have to use a different account.


# Usage 
Deploy the contract using remixIDE or hardhat, you can also create an account on alchemy but then you will have to use a faucet to get some Ether and that will make this longer so for the sake of simplicty I will use ganache + remixIDE 

# before you deploy the contract:
**•** install metamask in your browser, connect it to ganache, you can use the network tab to do this manually. 

**•** Import your first three accounts into metamask using their private keys, we need three accounts for the owner, the buyer and the delievery.

**•** Modify the contract with one of the accounts from metamask make sure it's not the first one or whatever account you use to deploy the contract, this is where to make the edit for the deliverys account:
```
(bool successDelivery, ) = payable(address(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB)).call{value: msg.value / 10}(""); // change the address here to match one of your addresses
```
**•** Deploy the contract on the same provider you used on metamask.

**•** add the contract address to public/logic.js.

# Install
```
npm install
npm start
```

P.S: We are using metamask injection thus the need for the server, if you prefer to not use a server you can, just place the js logic inside the html file and then open the file and you would need to change the web3 version in the dependencies the version that worked for me was  "web3": "^1.10.0" , you would also need to manually change the accounts everytime by typing them.

# To Do
Figure out how to pay rent to the owner of the contract instance.
