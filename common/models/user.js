module.exports = (user) => {
  user.afterRemote('login', (context, accessToken, next) => {
    const res = context.res;
    const req = context.req;
    if (accessToken != null) {
      if (accessToken.id != null) {
        res.cookie('access_token', accessToken.id, {
          signed: req.signedCookies ? true : false,
          maxAge: 1000 * accessToken.ttl
        });
        return next();
      }
    }
    return res.redirect('/');
  });
  user.afterRemote('logout', (context, result, next) => {
    const res = context.res;
    res.clearCookie('access_token');
    res.clearCookie('userId');
    return next();
  });
};
