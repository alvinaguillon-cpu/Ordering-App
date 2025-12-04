import { Router } from "express";
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;

const router = Router();


router.post('/login', handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({email});


    if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenResponse(user));
            return;
        }

        res.status(BAD_REQUEST).send('Username or password invalid!')

    })
);

router.post(
  '/register',
  handler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(BAD_REQUEST).send('User already exists, please login!');
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      PASSWORD_HASH_SALT_ROUNDS
    );

    const finalRole = 'CUSTOMER';
    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: finalRole,
    };

    // ✅ FIX: ADDED TRY/CATCH BLOCK
    try {
      const result = await UserModel.create(newUser);
      res.send(generateTokenResponse(result));
    } catch (error) {
      // Log the error for debugging
      console.error('Mongoose Registration Error:', error.message); 
      // Send a proper bad request response
      res.status(BAD_REQUEST).send('Registration failed due to invalid data.');
    }
  })
);

const generateTokenResponse = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
    }, process.env.JWT_SECRET, 
    {
        expiresIn: '30d',
    }
);

return {
    id: user.id,
    email: user.email,
    name: user.name, 
    role: user.role,
    wallet: user.wallet,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
    token, 
    };
};

export default router;  