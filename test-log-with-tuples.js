const ethers = require('ethers');

let abi = {
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "name": "takerAccountOwner",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "takerAccountNumber",
            "type": "uint256"
        },
        {
            "indexed": true,
            "name": "makerAccountOwner",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "makerAccountNumber",
            "type": "uint256"
        },
        {
            "indexed": false,
            "name": "inputMarket",
            "type": "uint256"
        },
        {
            "indexed": false,
            "name": "outputMarket",
            "type": "uint256"
        },
        {
            "components": [
                {
                    "components": [
                        {
                            "name": "sign",
                            "type": "bool"
                        },
                        {
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "deltaWei",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "name": "sign",
                            "type": "bool"
                        },
                        {
                            "name": "value",
                            "type": "uint128"
                        }
                    ],
                    "name": "newPar",
                    "type": "tuple"
                }
            ],
            "indexed": false,
            "name": "takerInputUpdate",
            "type": "tuple"
        },
        {
            "components": [
                {
                    "components": [
                        {
                            "name": "sign",
                            "type": "bool"
                        },
                        {
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "deltaWei",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "name": "sign",
                            "type": "bool"
                        },
                        {
                            "name": "value",
                            "type": "uint128"
                        }
                    ],
                    "name": "newPar",
                    "type": "tuple"
                }
            ],
            "indexed": false,
            "name": "takerOutputUpdate",
            "type": "tuple"
        },
        {
            "components": [
                {
                    "components": [
                        {
                            "name": "sign",
                            "type": "bool"
                        },
                        {
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "deltaWei",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "name": "sign",
                            "type": "bool"
                        },
                        {
                            "name": "value",
                            "type": "uint128"
                        }
                    ],
                    "name": "newPar",
                    "type": "tuple"
                }
            ],
            "indexed": false,
            "name": "makerInputUpdate",
            "type": "tuple"
        },
        {
            "components": [
                {
                    "components": [
                        {
                            "name": "sign",
                            "type": "bool"
                        },
                        {
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "deltaWei",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "name": "sign",
                            "type": "bool"
                        },
                        {
                            "name": "value",
                            "type": "uint128"
                        }
                    ],
                    "name": "newPar",
                    "type": "tuple"
                }
            ],
            "indexed": false,
            "name": "makerOutputUpdate",
            "type": "tuple"
        },
        {
            "indexed": false,
            "name": "autoTrader",
            "type": "address"
        }
    ],
    "name": "LogTrade",
    "type": "event"
};

var interface_instance = new ethers.utils.Interface([abi]);
var parsedLog = interface_instance.parseLog({
    topics: [
        '0x54d4cc60cf7d570631cc1a58942812cb0fc461713613400f56932040c3497d19',
        '0x000000000000000000000000f809e07870dca762b9536d61a4fbef1a17178092',
        '0x0000000000000000000000003801d2d7e604e8333baacb2ab53ceeb8d7995416',
    ],
    data: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000853a0d2313c0000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000016c2cd1c277322d3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000484164c41246c70000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000199e69d77e1ad1e203100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000853a0d2313c00000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000001bc508f91f55263de000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000484164c41246c70000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000002a3f07b78f3babd62000000000000000000000000cd81398895bea7ad9eff273aeffc41a9d83b4dad'
});

var parsedValues = parsedLog.values;

var transformParams = function(params, abiInputs) {
    var result = {};
    if (params && params.length >= abiInputs.length) {
        for (var i = 0; i < abiInputs.length; i++) {
            var paramName = abiInputs[i].name;
            var paramValue = params[i];
            if (abiInputs[i].type === 'address' && typeof paramValue === 'string') {
                // For consistency all addresses are lower-cased.
                paramValue = paramValue.toLowerCase();
            }
            if (ethers.utils.Interface.isIndexed(paramValue)) {
                paramValue = paramValue.hash;
            }
            if (abiInputs[i].type === 'tuple' && 'components' in abiInputs[i]) {
                paramValue = transformParams(paramValue, abiInputs[i].components)
            }
            result[paramName] = paramValue;
        }
    }
    return result;
};

var result = transformParams(parsedValues, abi.inputs);

console.log(result);