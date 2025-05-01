// utils/response.js

export function sendResponse(
   res,
   { success = true, status = 200, message = '', data = null },
) {
   const payload = { message };
   if (data) payload.data = data;

   return res.status(status).send(payload);
}
