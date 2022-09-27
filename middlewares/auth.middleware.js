const authMiddleware = (request, response, next) => {
  const { isLoggedIn } = request.cookies;
  const { userId } = request.cookies;
  if (isLoggedIn) {
    request.user = userId;
    next();
  } else {
    response.status(403).send('User not logged in!');
  }
};

export default authMiddleware;
