// utils/validate.js

/**
 * @param {Object[]} rules - Array of field validation rules
 * @param {string} rules[].field - Field name
 * @param {boolean} [rules[].required] - Whether the field is required
 * @param {RegExp} [rules[].regex] - Optional regex to validate value
 * @param {string} [rules[].message] - Custom error message
 * @param {Object} body - The request body to validate
 * @returns {{ success: boolean, message?: string, status?: number }}
 */
export function validate(rules, body) {
   if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
      return {
         success: false,
         message: 'Request body is missing or empty',
         status: 400,
      };
   }

   for (const rule of rules) {
      const value = body[rule.field];

      if (rule.required && !value) {
         return {
            success: false,
            message: `Missing required field: ${rule.field}`,
            status: 400,
         };
      }

      if (rule.regex && value && !rule.regex.test(value)) {
         return {
            success: false,
            message: rule.message || `Invalid value for ${rule.field}`,
            status: 422,
         };
      }
   }

   return { success: true };
}
