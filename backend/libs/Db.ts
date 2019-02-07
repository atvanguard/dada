import * as Bluebird from 'bluebird';
const mongodb = require('mongodb');
import {SignedOrder} from '0x.js';

const MongoClient = mongodb.MongoClient;
Bluebird.promisifyAll(mongodb.Collection.prototype);
Bluebird.promisifyAll(MongoClient);

export default class Db {
  private static instance: Db;
  private db;

  static getInstance() {
    if (!Db.instance) {
        Db.instance = new Db('mongodb://localhost:27017');
    }
    return Db.instance;
  }

  constructor(connection: string) {
    MongoClient.connectAsync(connection, { useNewUrlParser: true })
    .then(client => {
      this.db = client.db('dada');
    })
  }

  async addUser(user: any) {
    const exists = await this.db.collection('users').countAsync({id: user.id});
    if (!exists) {
      return this.db.collection('users').insertOneAsync(user);
    }
  }

  updateEthAddress(user_id, eth_address) {
    return this.db.collection('users').updateOneAsync(
      {id: user_id}, // query
      {$set: {eth_address}}
    );
  }

  async getEthAddress(user_id): Promise<string> {
    const user = await this.db.collection('users').findOneAsync({id: user_id});
    return user.eth_address;
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

  async getArtForSale(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.db.collection('art').find({}).toArray((err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
    })
  }

  placeArtUpForSale(images: any[]) {
    return this.db.collection('art').insertManyAsync(images);
  }

  addNewBid(bid: SignedOrder) {
    return this.db.collection('bids').insertOneAsync(bid)
  }

  getBids() {
    return new Promise((resolve, reject) => {
      return this.db.collection('bids').find({}).toArray((err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
    })
  }
}