GeekCash Node
============

A GeekCash full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [GeekCash Core (geekcashd) v1.0.x](https://github.com/geekcash/geekcash) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/geekcash/geekcash-node
cd geekcash-node
./bin/geekcashcore-node.js start
```

When running the start command, it will seek for a .geekcashcore folder with a geekcash-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to geekcashd.

Some plugins are available :

- Insight-API : `./bin/geekcashcore-node.js addservice @geekcash/insight-api
- Insight-UI : `./bin/geekcashcore-node.js addservice @geekcash/insight-ui`

You also might want to add these index to your dash.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install @geekcash/geekcash-node
```

```javascript
const geekcashcore = require('@geekcash/geekcash-node');
const config = require('./geekcash-node.json');

let node = geekcashcore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //GeekCash core started
    geekcashd.on('tx', function(txData) {
        let tx = new geekcashcore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- GeekCash Core (geekcashd) with support for additional indexing *(see above)*
- Node.js v0.10, v0.12, v4 or v5
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

GeekCash includes a Command Line Interface (CLI) for managing, configuring and interfacing with your GeekCash Node.

```bash
geekcash-node create -d <dash-data-dir> mynode
cd mynode
geekcash-node install <service>
geekcash-node install https://github.com/yourname/helloworld
geekcash-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [GeekCash Core](https://github.com/dashpay/dash/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/geekcash/insight-api/tree/master)
- [Insight UI](https://github.com/geekcash/insight-ui/tree/master)
- [Bitcore Wallet Service](https://github.com/geekcash/geekcashcore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [GeekCashd](docs/services/geekcashd.md) - Interface to GeekCash Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a geekcashd node already runing `geekcashd --daemon`.

GeekCash-node : `git clone https://github.com/geekcash/geekcash-node -b develop`
Insight-api (optional) : `git clone https://github.com/geekcash/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/geekcash/insight-ui -b develop`

Install them :
```
cd geekcash-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/geekcashcore-node.js start` to first generate a ~/.geekcashcore/geekcash-node.json file.
Append this file with `"@geekcash/insight-ui"` and `"@geekcash/insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/geekcash/geekcashcore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/geekcash/geekcash-node/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
