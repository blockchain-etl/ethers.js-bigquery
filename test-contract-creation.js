const ethers = require('ethers');

// https://etherscan.io/address/0x5cb5f46a655c02889172323760d12d0e5d83cdaf#code

let abi = {
    "inputs": [
        {
            "name": "_owners",
            "type": "address[]"
        },
        {
            "name": "_required",
            "type": "uint256"
        },
        {
            "name": "_daylimit",
            "type": "uint256"
        }
    ],
    "type": "constructor"
};

var types = [];
for (var i = 0; i < abi.inputs.length; i++) {
    types.push(abi.inputs[i].type);
}
var coder = ethers.utils.defaultAbiCoder;
var decoded = coder.decode(types, '0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000e40ee0e6e309b9e68362b78c3801928b511a7e30000000000000000000000002bcc3e2c286780e8c63823a4bddd7f7e3dbd35dc');

console.log(decoded);