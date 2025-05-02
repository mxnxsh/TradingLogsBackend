// utils/validationRules.js

export const regexPatterns = {
   email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
   password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
   // At least 8 chars, one upper, one lower, one number, one special char
   mobile: /^[6-9]\d{9}$/,
   name: /^[a-zA-Z\s]{2,50}$/,
   otp: /^\d{6}$/,
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

export const registerRules = [
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
