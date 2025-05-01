import dotenv from 'dotenv';
dotenv.config();
import {
   SecretsManagerClient,
   GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import cache from './cache.js';

// Initialize Secrets Manager client
const region = process.env.REGION;
if (!region) {
   throw new Error('AWS region is not defined in environment variables.');
}
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
      return cache.get(secretName);
   } else {
      return null;
   }
}

export default { getSecret, getSecretSync };
