const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const secrets = require('./app/libs/aws/secrets');

// Load environment variables
const { text, json, urlencoded } = bodyParser;

// const appConfig = require('./app/config/app.config');
const startServer = async () => {
   try {
      // await secrets.getSecret('DB_SECRET');

      // await secrets.getSecret('CONFIG_SECRET');

      // await secrets.getSecret('KEY_SECRET');
      const app = express();
      const corsOptions = {
         origin: '',
      };

      app.use(cors(corsOptions.origin));

      // parse requests of content-type - application/json
      app.use(text());
      app.use(json({ limit: '50mb' }));
      app.use(
         urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000,
         }),
      );

      app.use(async (req, res, next) => {
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization,x-access-token',
         );
         if (req.method === 'OPTIONS') {
            res.header(
               'Access-Control-Allow-Methods',
               'GET, POST, PUT, DELETE',
            );
            return res.status(200).json({});
         }
         next();
      });
      app.get('/health', async (req, res) => {
         return res.status(200).send('Valuenable');
      });

      app.use((error, req, res, next) => {
         if (error instanceof SyntaxError) {
            return res.status(400).send({ message: 'Invalid JSON syntax.' });
         } else if (error instanceof ReferenceError) {
            return res
               .status(500)
               .send({ message: 'Reference error, check your code!' });
         } else if (error instanceof RangeError) {
            return res.status(400).send({ message: 'Range Error.' });
         } else if (error.code === 'ENOENT') {
            return res
               .status(500)
               .send({ message: 'File or resource not found!' });
         } else {
            console.error('Unhandled Error:', error);
            return res.status(500).send({ message: 'Internal Server Error.' });
         }
      });

      app.use(morgan('dev'));
      app.use((error, req, res, next) => {
         if (error instanceof SyntaxError) {
            return res
               .status(error.status || 500)
               .send({ message: 'Invalid Syntax error' });
         } else if (error instanceof SystemError) {
            return res
               .status(error.status || 500)
               .send({ message: 'Not supported in your system' });
         } else if (error instanceof ReferenceError) {
            return res
               .status(error.status || 500)
               .send({ message: 'Typo error please check in your code!' });
         } else if (error instanceof RangeError) {
            return res
               .status(error.status || 500)
               .send({ message: 'Range Error ' });
         } else {
            next();
         }
      });
      // set port, listen for requests
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
         console.log(`Server is running on ${PORT}.`);
      });
   } catch (error) {
      console.error('Error retrieving secret:', error);
   }
};

startServer();
