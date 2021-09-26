const respond = (request, response, status, content, type) => {
	response.writeHead(status, { 'Content-Type': type });
	response.write(content);
	response.end();
};
  
const getStatusCode = (request, response, status, contentObj) => {  
	const jsonString = JSON.stringify(contentObj);
	return respond(request, response, status, jsonString, 'application/json');
};
  
const success = (request, response) => {
	const responseObj = {
		message: 'This is a successful response.',
	};
  
	getStatusCode(request, response, 200, responseObj);
};
  
 const badRequest = (request, response, params) => {
	const responseObj = {
		message: 'This request has the required parameters.',
	};
  
	if (!params.valid || params.valid !== 'true') {
	  responseObj.message = 'Missing valid query parameter set to true.';
	  responseObj.id = 'badRequest';
  
	  return getStatusCode(request, response, 400, responseObj);
	}
  
	return getStatusCode(request, response, 200, responseObj);
};
  
const unauthorized = (request, response, params) => {
	const responseObj = {
		message: 'You have successfully viewed the content.',
	};
  
	if (!params.loggedIn || params.loggedIn !== 'yes') {
		responseObj.message = 'Missing loggedIn query parameter set to yes.';
		responseObj.id = 'unauthorized';
  
		return getStatusCode(request, response, 401, responseObj);
	}
  
	return getStatusCode(request, response, 200, responseObj);
};
  
const forbidden = (request, response) => {
	const responseObj = {
		message: 'You do not have access to this content.',
		id: 'forbidden',
	};
  
	return getStatusCode(request, response, 403, responseObj);
};
  
const internal = (request, response) => {
	const responseObj = {
		message: 'Internal Server Error. Something went wrong.',
		id: 'internalError',
	};
  
	getStatusCode(request, response, 500, responseObj);
};
  
const notImplemented = (request, response) => {
	const responseObj = {
		message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
		id: 'internalError',
	};
  
	getStatusCode(request, response, 501, responseObj);
};
  
const notFound = (request, response) => {
	const responseObj = {
		message: 'The page you are looking for was not found.',
		id: 'notFound',
	};
  
	getStatusCode(request, response, 404, responseObj);
};

module.exports = {
	success,
	badRequest,
	unauthorized,
	forbidden,
	internal,
	notImplemented,
	notFound,
};