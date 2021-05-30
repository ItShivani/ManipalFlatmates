const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  // context = { ... headers }
 const authHeader = context.req.headers.authorization;
 //const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjEwOGJmODUxYzI0MzVhODY2MDNjNyIsImVtYWlsIjoiYW1hbkB5YWhvby5jby5pbiIsInVzZXJuYW1lIjoiQW1hbiIsImlhdCI6MTYyMjM2OTQ1MiwiZXhwIjoxNjIyMzczMDUyfQ.9Al1_Vmspc2Cc7hzn28ZfoFAuQIfGX3bXs4ZINcKpaU'
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token"); //Invalid/Expired Token
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};