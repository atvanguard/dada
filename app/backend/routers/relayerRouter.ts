import * as express from "express";
const router  = express.Router()

// https://github.com/0xProject/standard-relayer-api/blob/master/http/v2.md#post-v2order
router.post('/order', function (req, res) {
  res.send('hello world')
})

export default router;
