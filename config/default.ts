export default {
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  jwt_secret: process.env.JWT_SECRET,
  psql_uri: process.env.PSQL_URL,
  node_env: process.env.NODE_ENV,
  limitsavedSearches: 15,
  appUrl: "http://localhost:3000",
};
