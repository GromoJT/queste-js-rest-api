import { Router} from "express";
const { body, validationResult } = require('express-validator');

import {
    getUserPassController,
    registerUserController
} from '../controllers/auth.controller'

const router = Router();

//Get selected quest
//router.get('/',getUserPassController)

//register???
router.post('/register',
    body('name').trim().not().isEmpty().withMessage('name is required'),
    body('email').trim().not().isEmpty().withMessage('email is required'),
    body('hash_pass').trim().not().isEmpty().withMessage('Password is required'),
registerUserController)

//login user
router.post('/login',
    body('email').trim().not().isEmpty().withMessage('email is required'),
    body('hash_pass').trim().not().isEmpty().withMessage('Password is required')
,getUserPassController)

export default router;