import { Router } from 'express';

import UserController from '../controllers/user';

import UserValidation from '../middleware/uservalidator';

const { signUpCheck, loginCheck } = UserValidation;
const { createUser, logUserIn } = UserController;

const userRouter = Router();

userRouter.post('/signup', signUpCheck, createUser);
userRouter.post('/signin', loginCheck, logUserIn);

export default userRouter;
