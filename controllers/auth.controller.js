import { sendResponse } from '../utils/response.utils.js';
import { signToken } from '../utils/jwt.utils.js'; // Import the signToken function properly
import { httpStatuses } from '../utils/httpStatuses.utils.js';
import { comparePassword, hashPassword } from '../utils/hash.utils.js';
import { getUserByEmail, registerUser } from '../models/auth.model.js';

export const signin = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Check if user exists
      const [user] = await getUserByEmail(email);

      if (user.length === 0) {
         return sendResponse(res, {
            success: false,
            status: httpStatuses.UNAUTHORIZED,
            message: 'Invalid email or password.',
         });
      }

      const account = user[0];

      // Check if account is active
      if (!account.is_active) {
         return sendResponse(res, {
            success: false,
            status: httpStatuses.FORBIDDEN,
            message: 'Account is deactivated. Please contact support.',
         });
      }

      // Check if subscription is valid
      const now = new Date();
      if (
         account.subscription_end_date &&
         new Date(account.subscription_end_date) < now
      ) {
         return sendResponse(res, {
            success: false,
            status: httpStatuses.PAYMENT_REQUIRED,
            message: 'Subscription expired. Please renew to continue.',
         });
      }

      // Optional: Check email verification
      // if (!account.is_email_verified) {
      //    return sendResponse(res, {
      //       success: false,
      //       status: httpStatuses.UNAUTHORIZED,
      //       message: 'Please verify your email to sign in.',
      //    });
      // }

      // Compare entered password with hashed password in DB
      const isMatch = await comparePassword(password, account.password);
      if (!isMatch) {
         return sendResponse(res, {
            success: false,
            status: httpStatuses.UNAUTHORIZED,
            message: 'Invalid email or password.',
         });
      }

      // Create token payload
      const payload = {
         id: account.id,
         email: account.email,
         roleId: account.role_id,
         name: `${account.firstname} ${account.lastname}`,
         subscriptionEndDate: account.subscription_end_date,
      };

      const token = signToken(payload);

      return sendResponse(res, {
         success: true,
         status: httpStatuses.OK,
         message: 'Signed in successfully.',
         data: {
            token,
            email: payload.email,
            name: payload.name,
            roleId: payload.roleId,
            subscriptionEndDate: payload.subscriptionEndDate,
         },
      });
   } catch (error) {
      console.error('Signin Error:', error);
      return sendResponse(res, {
         success: false,
         status: httpStatuses.INTERNAL_SERVER_ERROR,
         message: 'Signin failed. Please try again.',
      });
   }
};

export const register = async (req, res) => {
   try {
      const { email, password, firstname, lastname, mobile } = req.body;

      // Check if the email already exists
      const [existingUser] = await getUserByEmail(email);

      if (existingUser.length > 0) {
         return sendResponse(res, {
            success: false,
            status: httpStatuses.BAD_REQUEST,
            message: 'User already registered with this email.',
         });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Prepare user data to be inserted into DB
      const userData = {
         firstname,
         lastname,
         email,
         mobile,
         password: hashedPassword, // hashed password
      };

      // Insert user into the DB
      await registerUser(userData);

      return sendResponse(res, {
         success: true,
         status: httpStatuses.CREATED,
         message: 'User registered successfully.',
      });
   } catch (error) {
      console.error('Registration Error:', error);
      return sendResponse(res, {
         success: false,
         status: httpStatuses.INTERNAL_SERVER_ERROR,
         message: 'Failed to register user.',
      });
   }
};
