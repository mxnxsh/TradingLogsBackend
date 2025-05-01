// middlewares/validateRequest.js

import { sendResponse } from '../utils/response.utils.js';
import { httpStatuses } from '../utils/httpStatuses.utils.js';
import { validate } from '../utils/validate.utils.js';

export function validateRequest(rules) {
   return (req, res, next) => {
      const validation = validate(rules, req.body);

      if (!validation.success) {
         return sendResponse(res, {
            success: false,
            status: validation.status || httpStatuses.BAD_REQUEST,
            message: validation.message,
         });
      }

      next();
   };
}
