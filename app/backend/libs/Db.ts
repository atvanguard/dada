import * as Bluebird from 'bluebird';
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
Bluebird.promisifyAll(mongodb.Collection.prototype);
Bluebird.promisifyAll(MongoClient);

export default class Db {
  private static instance: Db;

  static getInstance() {
    if (!Db.instance) {
        Db.instance = new Db('mongodb://localhost:27017');
    }
    return Db.instance;
  }

  private db;

  constructor(connection: string) {
    MongoClient.connectAsync(connection, { useNewUrlParser: true })
    .then(client => {
      this.db = client.db('dada');
    })
  }

  async addUser(user: any) {
    const exists = await this.db.collection('users').countAsync({id: user.id});
    if (!exists) {
      return this.db.collection('users').insertOne(user);
    }
  }

  updateAccessToken(id, access_token) {
    return this.db.collection('tokens').updateOneAsync(
      {id}, // query
      {$set: {access_token}},
      {upsert: true}
    );
  }

  async getAccessToken(id): Promise<string> {
    const doc = await this.db.collection('tokens').findOneAsync({id});
    return doc.access_token;
  }

  // async addEthAccount(userId: string, ethAddress: string) {
  //   // find one named 'mathias', tag him as a contributor and return the modified doc
  //   return await this.users.findAndModify({
  //     query: { id: userId },
  //     update: { $set: { ethAddress: ethAddress }}});
  //   //   new: true
  //   // }, function (err, doc, lastErrorObject) {
  //   //   // doc.tag === 'maintainer'
  //   // })
  // }

  // async addBid(bid: Order) {
  //   return await this.orders.save(bid);
  // }

  // async getBidsForNft(tokenId: string | number | BigNumber): Promise<Order[]> {
  //   const bids = [];
  //   // filter highest for each currency
  //   return bids;
  // }
}