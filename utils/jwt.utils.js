import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'yourSecretKey'; // Update with your secret key from .env

// Function to sign the JWT token
export function signToken(payload, expiresIn = '1h') {
   return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
}

// Function to verify the JWT token
export function verifyToken(token) {
   try {
      return jwt.verify(token, JWT_SECRET_KEY);
   } catch (err) {
      throw new Error('Invalid or expired token');
   }
}
