# ethers.js-bigquery

This module repackages ethers.js for use in BigQuery, to decode Ethereum event logs and transaction inputs.

Example usage:

```
CREATE TEMP FUNCTION
  DECODE_ERC721_TRANSFER(data STRING, topics ARRAY<STRING>)
  RETURNS STRUCT<`from` STRING, `to` STRING, tokenId STRING>
  LANGUAGE js AS """
    var CRYPTOKITTY_TRANSFER = {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    };

    var interface_instance = new ethers.utils.Interface([CRYPTOKITTY_TRANSFER]);
    var parsedLog = interface_instance.parseLog({topics: topics, data: data});

    return parsedLog.values;
"""
OPTIONS
  ( library="gs://blockchain-etl-bigquery/ethers.js" );
SELECT
  DECODE_ERC721_TRANSFER(data, topics) AS transfer
FROM
  `bigquery-public-data.crypto_ethereum.logs`
WHERE
  topics[SAFE_OFFSET(0)] = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" -- topic for Transfer(address,address,uint256) event
  AND address = "0x06012c8cf97bead5deae237070f9587f8e7a266d"
LIMIT 100;
```

The above query returns decoded CryptoKitty transfer events.

```
CREATE TEMP FUNCTION
  DECODE_CREATE_SALE_AUCTION(data STRING)
  RETURNS ARRAY<STRING>
  LANGUAGE js AS """
    var CRYPTOKITTY_CREATE_SALE_AUCTION = {
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
    };

    var interface_instance = new ethers.utils.Interface([CRYPTOKITTY_CREATE_SALE_AUCTION]);
    
    // You might need to wrap with try-catch here as transaction input is user provided data and might not follow abi. 
    var parsedTransaction = interface_instance.parseTransaction({data: data});

    return parsedTransaction.args;
"""
OPTIONS
  ( library="gs://blockchain-etl-bigquery/ethers.js" );
SELECT
  `hash`, DECODE_CREATE_SALE_AUCTION(input) AS decoded_input
FROM
  `bigquery-public-data.crypto_ethereum.transactions`
WHERE
  STARTS_WITH(input, "0x3d7d3f5a") -- 4byte sighash for createSaleAuction(uint256,uint256,uint256,uint256) method
  AND to_address = "0x06012c8cf97bead5deae237070f9587f8e7a266d"
LIMIT 100;
```

The above query returns decoded createSaleAuction() transactions inputs.

To include internal transactions use `bigquery-public-data.crypto_ethereum.traces` instead of 
`bigquery-public-data.crypto_ethereum.transactions`.

## Credits
- https://github.com/Arachnid/ethjs-abi-bigquery