import * as express from "express";
import * as _ from 'lodash';
const cookieParser = require('cookie-parser')

import Db from '../libs/Db';
import InstaApi from '../libs/InstaApi';
import Web3Relayer from '../libs/Web3Relayer';

export const router = express.Router()
export default router;

const db = Db.getInstance();
const ig = InstaApi.getInstance();
const web3Relayer = new Web3Relayer();

// This is where you would initially send users to authorize
router.get('/authorize_user', function(req, res) {
  res.redirect(ig.getAuthorizationUrl());
});

// This is your redirect URI
router.get('/handleauth', async function(req, res) {
  try {
    const access_token = await ig.authorizeUser(req.query.code);
    const instaUser = await ig.getUserDetails(access_token);
    await db.addUser(getUserPayload(instaUser));
    
    const user_id = InstaApi.getUserIdFromAccessCode(access_token);
    await db.updateAccessToken(user_id, access_token);

    // @todo
    // create and send jwt token, which will go in user's local storage
    // redirect to homepage /me
    res.cookie('user_id', user_id)
    res.redirect('/')
    // res.send('Sign up successful')
  } catch(e) {
    handleError(res, e)
  }
});

router.use(cookieParser())
router.get('/me', [
  checkAuth,
  async (req, res) => {
    try {
      const access_token = await db.getAccessToken(req.user_id)
      console.log('access_token', access_token)

      const media = await ig.getUserMedia(access_token);
      console.log('media', media)
      res.send(extractImageMetaData(media));
    } catch(e) {
      handleError(res, e)
    }
  }
])

router.use(express.json());

// link user's ethereum address to insta account
router.post('/linkAddress', [
  checkAuth,
  async (req, res) => {
    const ethAddress = getEthAddressFromSignedMessage(req.body);
    try {
      await db.updateEthAddress(req.user_id, ethAddress);
      res.send('Updated ethAddress');
    } catch(e) {
      handleError(res, e)
    }
  }
])

// import a creators art - will create NFTs
router.post('/import', [
  checkAuth,
  async (req, res) => {
    console.log(req.body);
    try {
      // get linked ethereum address
      const creator = await db.getEthAddress(req.user_id); 
      await web3Relayer.createNfts(creator, req.body.images);
      await db.placeArtUpForSale(creator, req.body.images);
      res.send('Imported!')
    } catch(e) {
      handleError(res, e)
    }
  }
])

// Helper functions
function getUserPayload(user: any) {
  return _.pick(user, ['id', 'username', 'profile_picture', 'full_name']);
}

function handleError(res, e) {
  console.log(e);
  res.status(500).send(e)
}

function extractImageMetaData(media: any) {
  return media.map(m => {
    return {
      id: m.id,
      url: m.images.standard_resolution.url
    }
  })
}

function getEthAddressFromSignedMessage(sig) {
  return '0x60697A2711fCd77bA434faF04588f9b20fc96A3c'
}

// appends user_id to req object
function checkAuth(req, res, next) {
  console.log('cookie', req.cookies)
  // let jwt = req.headers['authorization'];
  // if (!jwt) {
  //   return res.sendStatus(403); // Forbidden (403)
  // }
  // // @todo decode jwt
  // jwt = JSON.parse(jwt);
  if(!req.cookies || !req.cookies.user_id) {
    return res.send('Sign up with instagram first');
    // return res.redirect(ig.getAuthorizationUrl());
  }
  req.user_id = req.cookies.user_id
  next();
}
