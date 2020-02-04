const ethers = require('ethers');

let abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "hash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "registrationDate",
                "type": "uint256"
            }
        ],
        "name": "HashInvalidated",
        "type": "event"
    }
];

var interface_instance = new ethers.utils.Interface(abi);
var parsedLog = interface_instance.parseLog({
    topics: [
        '0x1f9c649fe47e58bb60f4e52f0d90e4c47a526c9f90c5113df842c025970b66ad',
        '0xd8321837f963bcc931d1ac71557689dcf6b35ea541a11bad4907ac76f0525d37',
        '0xd8321837f963bcc931d1ac71557689dcf6b35ea541a11bad4907ac76f0525d37',
    ],
    data: '0x000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000000000005a7c42f9'
});

var parsedValues = parsedLog.values;

var result = {};
for (var k in parsedValues) {
    if (parsedValues.hasOwnProperty(k)) {
        result[k] = ethers.utils.Interface.isIndexed(parsedValues[k]) ? parsedValues[k].hash : parsedValues[k]
    }
}

console.log(result);