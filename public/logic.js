
/** 
 * Author: Ahmedou M-Lahmed
 * email: 7medouu@gmail.com
 * 
 * **/
window.addEventListener('load', async function() {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        const contractAddress = '0x6088A74C24E49C3c1685696F7EFD7a2Adf46dDa4'; //// Replace with the contract address 
        const response = await fetch('ABI.json'); 
        const abi = await response.json();
        const contract = new web3.eth.Contract(abi, contractAddress);

     // Function to add a magazine

    document.getElementById("addMagazine").addEventListener("click", async () => {
            const title = document.getElementById("title").value;
            const publisher = document.getElementById("publisher").value;
            const price = parseInt(document.getElementById("price").value);
            console.log(price)
    // Call the Solidity function with the provided values
             await contract.methods.addMagazine(title, publisher, price).send({ from:  window.ethereum.selectedAddress});
  
    // You may want to add error handling and confirmation messages here
  });
  
    
          // Function to buy a magazine
    document.getElementById('buyMagazine').addEventListener('click', async () => {
                const magazineId = document.getElementById('magazineId').value;
                const magazineDetails = await contract.methods.magazines(magazineId).call();
                const priceInWei = magazineDetails.price;
                const available = magazineDetails.available;
                if (magazineDetails.seller.toLowerCase() === window.ethereum.selectedAddress.toLowerCase()){ //Make sure the buyer and the seller are not the same account
                    alert('You cannot buy your own magazine, :/ try a different account') 
                }else
                { //proceed with buying the magazine
                const priceInEther = web3.utils.fromWei(priceInWei, 'ether');
               
                console.log(priceInWei)           
                // Prompt the user to confirm the purchase
                if (available){
                if (confirm(`Do you want to purchase this magazine for ${priceInEther} Ether?`)) {
                  try {
                    // Send the transaction with the dynamically calculated value
                    await contract.methods.buyMagazine(magazineId).send({from:  window.ethereum.selectedAddress, value: priceInWei });
                    alert('Magazine purchased successfully!');
                  } catch (error) {
                    alert(`Error: ${error.message}`);
                  }
                }}
                else {
                    alert("Magazine is not available :( try another one")
                }}
            });
    
            // Function to check magazine availability
            document.getElementById('checkMagazineAvailability').addEventListener('click', async () => {
                const checkMagazineId = document.getElementById('checkMagazineId').value;
                let isAvailable;
                await contract.methods.magazines(checkMagazineId).call().then((result)=>{isAvailable = result.available}).catch((error)=>{alert(error)});
                if (isAvailable){alert(`Magazine is available! purchase it`);} else{ 
                    alert('Not available sorry')}

            });
    
            // Function to get magazine details
            document.getElementById('getMagazineDetails').addEventListener('click', async () => {
                const detailsMagazineId = document.getElementById('detailsMagazineId').value;
    
                const magazineDetails = await contract.methods.magazines(detailsMagazineId).call();
                const title = magazineDetails.title;
                const publisher = magazineDetails.publisher;
                const price = magazineDetails.price;
                const seller = magazineDetails.seller;
                const available = magazineDetails.available;
    
                document.getElementById('magazineDetails').innerHTML = `Title: ${title}<br>Publisher: ${publisher}<br>Price: ${price} Wei<br>Seller: ${seller}<br>Available: ${available}`;
            });
        } else {
            alert('MetaMask not detected. Please install MetaMask extension.');
        }
});