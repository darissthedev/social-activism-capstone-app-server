const AuthService = require('../auth/auth-service');

function requireAuth(req, res, next) {
  // console.log(bearerToken);
  const authToken = req.get('Authorization') || '';
  console.log(authToken);

  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }
  // console.log(bearerToken);
  try {
    const payload = AuthService.verifyJwt(bearerToken);

    AuthService.getUserWithEmail(
      req.app.get('db'),
      payload.sub
    )
      .then(user => {
        if (!user){
          console.log('no user in db');
          return res.status(401).json({ error: 'Unauthorized request' });
        }
        req.user = user;
        next();
      })
      .catch(err => {
        console.error(err);
        next(err);
      });
  } catch(error) {
    console.log(error);
    res.status(401).json({ error: 'Unauthorized request' });
  }
}

module.exports = {
  requireAuth,
};