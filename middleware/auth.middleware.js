import { sendResponse } from '../utils/response.utils.js';
import { verifyToken } from '../utils/jwt.js';
import { httpStatuses } from '../utils/httpStatuses.utils.js';

export function verifyAuth(req, res, next) {
   // Check if authorization header is present
   const token =
      req.headers['authorization'] &&
      req.headers['authorization'].split(' ')[1];

   if (!token) {
      return sendResponse(res, {
         success: false,
         status: httpStatuses.UNAUTHORIZED,
         message: 'No token provided. Please login first.',
      });
   }

   try {
      const decoded = verifyToken(token); // Verify the token
      req.user = decoded; // Attach the decoded token to the request (user data, etc.)
      next(); // Move to the next middleware or controller
   } catch (error) {
      return sendResponse(res, {
         success: false,
         status: httpStatuses.UNAUTHORIZED,
         message: 'Invalid or expired token.',
      });
   }
}
3;
