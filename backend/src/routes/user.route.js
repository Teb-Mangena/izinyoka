import express from "express";
import { checkAuth, deleteMyAccount, deleteUser, editProfileImage, getAllUsers, loginUser, logoutUser, signupUser, updateMyDetails, updateUser } from "../controllers/user.controller.js";
import { protectAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../lib/cloudinary.js";

const router = express.Router();

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.use(protectAuth);
router.get('/check-auth', checkAuth)

router.patch('/edit-profile-image',
  upload.single("image"), 
  editProfileImage
);
router.patch('/edit-user-details', updateMyDetails);
router.delete('/delete-account', deleteMyAccount);

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);


export default router;