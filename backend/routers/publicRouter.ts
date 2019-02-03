import * as express from "express";
import * as _ from 'lodash';

import {handleError} from './util';
import Db from '../libs/Db';
const db = Db.getInstance();

export const router = express.Router()
export default router;

router.get('/listing', async (req, res) => {
  try {
    const art: any = await db.getArtForSale();
    console.log(art)
    res.send(art.map(a => _.pick(a, ['id', 'caption', 'url', 'owner'])))
  } catch (e) {
    handleError(res, e)
  }
})
