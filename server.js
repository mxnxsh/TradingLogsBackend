import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import secrets from './libs/aws/secrets.js';
import authRoutes from './routes/auth.route.js';

// Load environment variables
const { text, json, urlencoded } = bodyParser;
import './models/db.model.js';
const startServer = async () => {
   try {
      // await secrets.getSecret('DB_SECRET');

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
         return res.status(200).send('Health is great in trading logs...');
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
      app.use('/', authRoutes);

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
