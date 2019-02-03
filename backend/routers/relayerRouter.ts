import * as express from "express";
const router  = express.Router()

import {handleError} from './util';
import Db from '../libs/Db';
const db = Db.getInstance();

router.use(express.json());

// https://github.com/0xProject/standard-relayer-api/blob/master/http/v2.md#post-v2order
router.post('/order', function (req, res) {
  const bid = req.body;
  // @todo validate bid schema
  try {
    db.addNewBid(bid)
  } catch (e) {
    handleError(res, e);
  }
})

export default router;
