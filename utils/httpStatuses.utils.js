export const httpStatuses = {
   // 2xx Success
   OK: 200, // The request succeeded.
   CREATED: 201, // The request succeeded and a new resource was created.
   ACCEPTED: 202, // The request has been accepted for processing, but the processing is not complete.
   NO_CONTENT: 204, // The server successfully processed the request, but there is no content to send.

   // 3xx Redirection
   MOVED_PERMANENTLY: 301, // The resource has been moved permanently to a new URL.
   FOUND: 302, // The resource resides temporarily under a different URI.
   NOT_MODIFIED: 304, // The resource has not been modified since the last request.

   // 4xx Client Errors
   BAD_HTTP_REQUEST: 400, // The server could not understand the request due to invalid syntax.
   UNAUTHORIZED: 401, // Authentication is required and has failed or not been provided.
   FORBIDDEN: 403, // The client does not have access rights to the content.
   RESOURCE_NOT_FOUND: 404, // The server cannot find the requested resource.
   METHOD_NOT_ALLOWED: 405, // The request method is known by the server but is not supported by the resource.
   CONFLICT: 409, // The request could not be completed due to a conflict with the current state of the target resource.
   UNPROCESSABLE_ENTITY: 422, // The server understands the content type but was unable to process the contained instructions.
   TOO_MANY_REQUESTS: 429, // The user has sent too many requests in a given amount of time ("rate limiting").

   // 5xx Server Errors
   INTERNAL_SERVER_ERROR: 500, // The server encountered a situation it doesn't know how to handle.
   NOT_IMPLEMENTED: 501, // The request method is not supported by the server and cannot be handled.
   BAD_GATEWAY: 502, // The server received an invalid response from the upstream server.
   SERVICE_UNAVAILABLE: 503, // The server is not ready to handle the request (e.g., overloaded or under maintenance).
   GATEWAY_TIMEOUT: 504, // The server did not receive a timely response from the upstream server.
   NETWORK_AUTHENTICATION_REQUIRED: 511, // The client needs to authenticate to gain network access.
};
