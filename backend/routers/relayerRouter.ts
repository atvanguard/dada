import * as express from "express";
const router  = express.Router()

import {handleError} from './util';
import Db from '../libs/Db';
const db = Db.getInstance();

router.use(express.json());

router.get('/orderbook', async (req, res) => {
  try {
    const bids = await db.getBids()
    res.send(bids.map(b => b.bid.signature))
  } catch (e) {
    handleError(res, e);
  }
})

// https://github.com/0xProject/standard-relayer-api/blob/master/http/v2.md#post-v2order
router.post('/order', async (req, res) => {
  const bid = req.body;
  // @todo validate bid schema
  console.log(bid)
  try {
    await db.addNewBid(bid)
    res.send()
  } catch (e) {
    handleError(res, e);
  }
})

export default router;
