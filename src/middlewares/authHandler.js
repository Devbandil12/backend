import jwt from "jsonwebtoken";
import dot from "dotenv";
dot.config();


async function authHandler(req, res, next) {
  try {
    const cookie = req.headers.cookie.replace("cookie=","");
   
    if (!cookie) {
      return res.status(403).json({ message: "No cookie found. You are not logged in." });
    }

    // Extract token from cookie string
    

    // Verify the token using the secret from .env
    const decoded = jwt.verify(cookie, "123");

    console.log(decoded); // Contains payload like { id: userId, iat, exp }

    // You can attach user data to req for later use
    // res.id = decoded.id;

   if(decoded.id==req.body.username) next();
   
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export const authhandler = authHandler;
