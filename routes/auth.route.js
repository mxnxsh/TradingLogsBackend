// routes/auth.routes.js

/* Packages imports */
import express from 'express';

/* Controller imports */
import { signin, register } from '../controllers/auth.controller.js';

/* Utils imports */
import { signinRules, registerRules } from '../utils/validationRules.utils.js';

/* Middleware imports */
import { validateRequest } from '../middleware/validateRequest.middleware.js';

const router = express.Router();

router.post('/signin', validateRequest(signinRules), signin);
router.post('/register', validateRequest(registerRules), register);

export default router;
