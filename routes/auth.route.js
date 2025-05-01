// routes/auth.routes.js

import express from 'express';
import { signin } from '../controllers/auth.controller.js';
import { signinRules } from '../utils/validationRules.utils.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';

const router = express.Router();

router.post('/signin', validateRequest(signinRules), signin);

export default router;
