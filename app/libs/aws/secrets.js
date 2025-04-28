const {
   SecretsManagerClient,
   GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');
const cache = require('./cache');
const util = require('util');

// Initialize Secrets Manager client
console.log(process.env.REGION);
const secretsManager = new SecretsManagerClient({ region: process.env.REGION });

// Function to retrieve a secret by name
async function getSecret(secretName) {
   if (cache.get(secretName)) {
      // If the secret is in the cache, return it
      return Promise.resolve(cache.get(secretName));
   } else {
      try {
         // Retrieve the secret from AWS Secrets Manager
         const command = new GetSecretValueCommand({ SecretId: secretName });
         const response = await secretsManager.send(command);

         // Parse and store the secret in the cache
         const secretString = response.SecretString;
         const secretValue = JSON.parse(secretString);
         cache.set(secretName, secretValue);

         return Promise.resolve(secretValue);
      } catch (error) {
         console.error(
            `Error retrieving secret "${secretName}": ${error.message}`,
         );
         throw error;
      }
   }
}

function getSecretSync(secretName) {
   if (cache.get(secretName)) {
      // If the secret is in the cache, return it
      return cache.get(secretName);
   } else {
      return null;
   }
}

module.exports = { getSecret, getSecretSync };
