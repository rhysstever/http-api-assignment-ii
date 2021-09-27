const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponseHandler = require('./htmlResponses.js');
const jsonResponseHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlResponseHandler.getIndex,
    '/style.css': htmlResponseHandler.getCSS,
    '/getUsers': jsonResponseHandler.getUsers,
    '/updateUser': jsonResponseHandler.updateUser,
    notFound: jsonResponseHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonResponseHandler.getUsersMeta,
    notFound: jsonResponseHandler.notFoundMeta,
  },
};

const handlePost = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/addUser') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonResponseHandler.updateUser(request, response, bodyParams);
    });
  }
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedURL);
  } else if (urlStruct[request.method][parsedURL.pathname]) {
    urlStruct[request.method][parsedURL.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
