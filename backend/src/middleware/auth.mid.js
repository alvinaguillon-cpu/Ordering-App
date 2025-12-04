import jwt from 'jsonwebtoken'; // Corrected import
import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default (req, res, next) => {
  const authHeader = req.headers.authorization; 
  
  if (!authHeader) return res.status(UNAUTHORIZED).send();

  // Defining 'token' with 'const' makes it available for the 'try' block
  const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

  try {
    // Diagnostic logs (keep these for one more check)
    console.log("Auth Middleware Secret:", process.env.JWT_SECRET);
    console.log("Token being verified:", token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Correct function call
    req.user = decoded; 
  } catch (error) {
    // Diagnostic log
    console.error("JWT Verification FAILED:", error.message); 
    return res.status(UNAUTHORIZED).send();
  }

  return next();
};