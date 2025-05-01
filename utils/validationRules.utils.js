// utils/validationRules.js

export const regexPatterns = {
   email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
   password: /^.{6,}$/, // At least 6 characters
   mobile: /^[6-9]\d{9}$/, // Indian mobile format (starts with 6-9, 10 digits)
   name: /^[a-zA-Z\s]{2,50}$/, // Optional: for names
   otp: /^\d{6}$/, // 6-digit OTP
};

export const signinRules = [
   {
      field: 'email',
      required: true,
      regex: regexPatterns.email,
      message: 'Email is not valid',
   },
   {
      field: 'password',
      required: true,
      regex: regexPatterns.password,
      message: 'Password must be at least 6 characters',
   },
];

export const mobileRules = [
   {
      field: 'mobile',
      required: true,
      regex: regexPatterns.mobile,
      message: 'Invalid mobile number (must be 10 digits, starting with 6-9)',
   },
];
