import * as express from "express";

export const router = express.Router()

// signup with insta account
router.post('/signup', function (req, res) {
  res.send('hello world')
})

// link user's ethereum address to insta account
router.post('/linkAddress', function (req, res) {
  res.send('hello world')
})

// import a creators art - will create NFTs
router.post('/import', function (req, res) {
  res.send('hello world')
})

export default router;
