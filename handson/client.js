const {
  createAuthMiddlewareForClientCredentialsFlow,
  createAuthMiddlewareForPasswordFlow,
} = require("@commercetools/sdk-middleware-auth");
const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");
const { createClient } = require("@commercetools/sdk-client");
const {
  createApiBuilderFromCtpClient,
} = require("@commercetools/typescript-sdk");

const {
  createApiBuilderFromCtpClient: createApiBuilderFromCtpClientOnlyForImports,
} = require("@commercetools/importapi-sdk");
require("dotenv").config();

const fetch = require("node-fetch");

const projectKey = process.env.projectKey;

//use .env for credentials process.env.adminClientId 

const getClient = () => {
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: process.env.authUrl,
    projectKey,
    credentials: {
      clientId: process.env.myClientId,
      clientSecret: process.env.myClientSecret,
    },
    scopes: [process.env.scopes],
    fetch,
  })
  const httpMiddleware = createHttpMiddleware({
    host: process.env.apiUrl,
    fetch,
  })
  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })

  return client
};

const getImportClient = () => {
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: process.env.authUrl,
    projectKey,
    credentials: {
      clientId: process.env.myClientId,
      clientSecret: process.env.myClientSecret,
    },
    scopes: [process.env.scopes],
    fetch,
  })
  const httpMiddleware = createHttpMiddleware({
    host: process.env.importApiUrl,
    fetch,
  })
  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })

  return client

};

const getStoreClient = () => {
  
};

const getMLClient = () => {};

const getMyAPIClient = () => {
  
};

module.exports.apiRoot = createApiBuilderFromCtpClient(getClient());

module.exports.importApiRoot = createApiBuilderFromCtpClientOnlyForImports(
  getImportClient()
);

// module.exports.storeApiRoot = createApiBuilderFromCtpClient(getStoreClient());

// module.exports.myApiRoot = createApiBuilderFromCtpClient(getMyAPIClient());
module.exports.projectKey = projectKey;