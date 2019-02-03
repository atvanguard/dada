# Dada

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