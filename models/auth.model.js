import { sql } from './db.model.js';

export const getUserByEmail = email => {
   let query = 'SELECT * FROM users WHERE email = ?';
   let params = [email];
   return sql.query(query, params);
};
export const registerUser = userData => {
   const query = `
     INSERT INTO users 
     (firstname, lastname, email, mobile, password, is_active, role_id, is_email_verified, is_mobile_verified, subscription_start_date, subscription_end_date, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
   const params = [
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.mobile,
      userData.password, // already hashed password
      1, // is_active = true
      2, // role_id = 2 (normal user, you can adjust this as per your logic)
      0, // is_email_verified = false initially
      0, // is_mobile_verified = false initially
      null, // subscription_start_date = null (you can set a default date if needed)
      null, // subscription_end_date = null (you can set a default date if needed)
      new Date(), // created_at = current date/time
   ];
   return sql.query(query, params);
};
