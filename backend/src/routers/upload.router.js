import { Router } from 'express';
import multer from 'multer';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import handler from 'express-async-handler';

const router = Router();


const upload = multer({ dest: 'uploads/' }); 


router.post(
  '/', 
  upload.single('image'), 
  handler(async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
   
    const filePath = `/uploads/${req.file.filename}`;
    
 
    res.send({ 
      url: filePath,
    });
  })
);

export default router;