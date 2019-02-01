import * as express from "express";
import * as _ from 'lodash';

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

    res.send('Sign up successful')
  } catch(e) {
    handleError(res, e)
  }
});

router.get('/me', async function(req, res) {
  // @todo read user_id from jwt token
  const { user_id } = req.query;
  try {
    const access_token = await db.getAccessToken(user_id)
    console.log('access_token', access_token)

    const media = await ig.getUserMedia(access_token);
    console.log('media', media)

    const _media = await extractImages(media);
    res.send(_media);
  } catch(e) {
    handleError(res, e)
  }
})

router.use(express.json());

// import a creators art - will create NFTs
router.post('/import', async function (req, res) {
  console.log(req.body);
  try {
    // get linked ethereum address
    const creator = '0xabc'; 
    const ids = req.body.images.map(i => i.id)
    await web3Relayer.createNfts(creator, ids);
    res.send('Imported!')
  } catch(e) {
    handleError(res, e)
  }
})

// link user's ethereum address to insta account
router.post('/linkAddress', function (req, res) {
  res.send('hello world')
})

// Helper functions
function getUserPayload(user: any) {
  return _.pick(user, ['id', 'username', 'profile_picture', 'full_name']);
}

function handleError(res, e) {
  console.log(e);
  res.status(500).send(e)
}

function extractImages(media: any) {
  return media.map(m => {
    return {
      caption: m.caption,
      url: m.images.standard_resolution.url
    }
  })
}
