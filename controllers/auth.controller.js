import { sendResponse } from '../utils/response.utils.js';
import { signToken } from '../utils/jwt.utils.js'; // Import the signToken function properly
import { httpStatuses } from '../utils/httpStatuses.utils.js';

export const signin = async (req, res) => {
   try {
      // Validate the user and sign a JWT token
      const { email } = req.body;

      const payload = { email };
      const token = signToken(payload); // Use the signToken function here

      return sendResponse(res, {
         success: true,
         status: httpStatuses.OK,
         message: 'Signed in successfully',
         data: { email, token },
      });
   } catch (error) {
      console.error(error); // Log the error
      return sendResponse(res, {
         success: false,
         status: httpStatuses.INTERNAL_SERVER_ERROR,
         message: 'Something went wrong.',
      });
   }
};
3;
