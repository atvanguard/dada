const ig = require('instagram-node').instagram();

export default class InstaApi {
  private static instance: InstaApi;
  private static redirect_uri = 'https://324971b2.ngrok.io/account/handleauth';

  static getInstance() {
    if (!InstaApi.instance) {
      InstaApi.instance = new InstaApi();
    }
    return InstaApi.instance;
  }

  public static getUserIdFromAccessCode(access_token: string) {
    return access_token.split('.')[0]
  }

  public getAuthorizationUrl(scope = ['basic']) {
    this._setClientAppCreds();
    return ig.get_authorization_url(InstaApi.redirect_uri, { scope });
  }

  public authorizeUser(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ig.authorize_user(code, InstaApi.redirect_uri, async function(err, result) {
        if (err) return reject(err);
        resolve(result.access_token);
      });
    })
  }

  public getUserDetails(access_token: string) {
    ig.use({ access_token });
    return new Promise((resolve, reject) => {
      ig.user(InstaApi.getUserIdFromAccessCode(access_token), function(err, result, remaining, limit) {
        if (err) return reject(err);
        resolve(result);
      });
    })
  }

  public getUserMedia(access_token: string) {
    ig.use({ access_token });
    return new Promise((resolve, reject) => {
      ig.user_media_recent(InstaApi.getUserIdFromAccessCode(access_token), {}, function(err, media, pagination, remaining, limit) {
        if (err) return reject(err);
        resolve(media);
      });
    })
  }

  private _setClientAppCreds() {
    // @todo read from env vars
    ig.use({
      client_id: 'cf29136af82b434aaceb96a8866939b3',
      client_secret: '070349d113eb4a19a431a65093eb5ad2'
    });
  }
}