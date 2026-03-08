import express from "express";
import { checkAuth, deleleUser, getAllUsers, loginUser, logoutUser, signupUser, updateUser } from "../controllers/user.controller.js";
import { protectAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.use(protectAuth);
router.get('/check-auth', checkAuth)

router.get('/', getAllUsers);
router.delete('/:id', deleleUser);
router.patch('/:id', updateUser);


export default router;