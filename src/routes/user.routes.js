import express from 'express';
// CONTROLLERS
import userController from '../controllers/user.controller';

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

export default router;
