const ethers = require('ethers');

let abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_kittyId",
                "type": "uint256"
            },
            {
                "name": "_startingPrice",
                "type": "uint256"
            },
            {
                "name": "_endingPrice",
                "type": "uint256"
            },
            {
                "name": "_duration",
                "type": "uint256"
            }
        ],
        "name": "createSaleAuction",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

var interface_instance = new ethers.utils.Interface(abi);

// https://etherscan.io/tx/0x49f0386560428eeeae4baf7f140af24a5d458ee77a0a1ff6597337bf3ddc122e
var parsedTransaction = interface_instance.parseTransaction({
    data: '0x3d7d3f5a00000000000000000000000000000000000000000000000000000000000f4488000000000000000000000000000000000000000000000000d02ab486cedc0000000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000002a300'
});

console.log(parsedTransaction.args);