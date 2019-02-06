# Dada

### Run app
```shell
(Download ganache snapshot)

ganache-cli \
--networkId 50 \
-p 8545 \
--db ~/Downloads/0x_ganache_snapshot \
-m "concert load couple harbor equip island argue ramp clarify fence smart topic"

docker run -p 27017:27017 -d mongo

yarn run truffle migrate --reset
yarn build
yarn start
```

### Development
```shell
export MNEMONIC='concert load couple harbor equip island argue ramp clarify fence smart topic'
ganache-cli --mnemonic $MNEMONIC -i 50

yarn run truffle compile
yarn run truffle migrate --reset

docker run -p 27017:27017 -d mongo

yarn build
yarn run server:dev
```
**Notes**
Use truffle and tsc from `node_modules`
```shell
yarn run truffle [command]
yarn run tsc [command]
```

**MongoDb**
```shell
docker run -p 27017:27017 -d mongo

(to connect from CLI)
mongo
```