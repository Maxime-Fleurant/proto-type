import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: 'dev-f64kzrh2.eu.auth0.com',
  clientId: 'nX8cny4I3MIt8HcQoXFc8MmHToOBUj95',
  clientSecret: 'hzOF55WHwtOQiX5Z7YxpNFsleNfNAJMF4Z3t70h_FVz1y7BjmYLJcluL2Lnkq8mg',
  scope: 'openid profile',
  audience: 'hasura',
  redirectUri: 'http://localhost:3000/api/callback',
  postLogoutRedirectUri: 'http://localhost:3000/',
  session: {
    // Use any strong secret to protect your cookie
    cookieSecret: 'flksdmlfkdsmlkflmkopeiazpeoilfdskmldskfpoiokmsdlkpoi',
    // Set cookie valid life time to one day
    cookieLifetime: 60 * 60 * 24,
    // Make sure requesting domain and cookie domain are the same
    cookieSameSite: 'lax',
    // Store user credentials in session cookie
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true,
  },
});
