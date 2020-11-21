import request from 'request';
import util from 'util';
import auth0 from '../../lib/auth0';

export default auth0.requireAuthentication(async function graphQL(req, res) {
  console.log('graph query');
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken({
      scope: ['openid', 'profile'],
    });

    const headers = {
      // Attach token to header
      Authorization: `Bearer ${accessToken}`,
      // Set content type to JSON
      'Content-Type': 'application/json',
    };
    const asyncReqPost = util.promisify(request.post);
    // Send request
    const graphQLApiResponse = await asyncReqPost({
      url: `http://localhost:8080/v1/graphql`,
      headers,
      json: req.body,
      timeout: 5000, // give queries more time to run
      gzip: true,
    });
    // Set response header
    res.setHeader('Content-Type', 'application/json');
    // Send response
    res.end(JSON.stringify(graphQLApiResponse.body));
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
});
