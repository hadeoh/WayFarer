import { Router } from 'express';

import UserController from '../controllers/user';

import UserValidation from '../middleware/uservalidator';

import Auth from '../middleware/auth';

const { signUpCheck } = UserValidation;
const { createUser } = UserController;

const userRouter = Router();

userRouter.post('/signup', signUpCheck, createUser);

export default userRouter;
