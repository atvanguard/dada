import { BigNumber, Order } from "0x.js";
import mongojs from 'mongojs';

export default class Db {
  private db;
  private users;
  private orders;

  constructor(connection: string) {
    this.db = mongojs(connection);
    this.users = this.db.collection('users')
    this.orders = this.db.collection('orders')
  }

  async addUser(user: any) {
    return await this.users.save(user);
  }

  async addEthAccount(userId: string, ethAddress: string) {
    // find one named 'mathias', tag him as a contributor and return the modified doc
    return await this.users.findAndModify({
      query: { id: userId },
      update: { $set: { ethAddress: ethAddress }}});
    //   new: true
    // }, function (err, doc, lastErrorObject) {
    //   // doc.tag === 'maintainer'
    // })
  }

  async addBid(bid: Order) {
    return await this.orders.save(bid);
  }

  async getBidsForNft(tokenId: string | number | BigNumber): Promise<Order[]> {
    const bids = [];
    // filter highest for each currency
    return bids;
  }
}