## Setup

* npm install
* run npm start for the ui in problem2
* exec ts-node src/problem4/retrieve-holders.ts for problem4
* execute npm test , should see the result for problem3

```
body="{\"id\":0,\"jsonrpc\":\"2.0\",\"error\":{\"code\":-32603,\"message\":\"handle request error\"}}", error={"code":-32603}, requestBody="{\"method\":\"eth_getLogs\",\"params\":[{\"fromBlock\":\"0x72b0cb\",\"toBlock\":\"0x72c453\",\"address\":\"0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c\",\"topics\":[\"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef\"]}],\"id\":44,\"jsonrpc\":\"2.0\"}", requestMethod="POST", url="https://bsc-dataseed.binance.org/", code=SERVER_ERROR, version=web/5.1.0)

```

You may see this error print for some batch, I believe the issue is from binance server
