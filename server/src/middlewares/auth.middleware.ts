import { Request, Response, NextFunction } from "express";
import jwt from "jwt-simple";

export const validUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
    const token = req.headers.authorization;
    console.log("token", token);
  
    let payload;
    try {
      payload = jwt.decode(token!, process.env.JWT_SECRET!);
      req.currentUserId = payload;
    } catch (error) {
      res.json({ error });
      return;
    }
  
    if (!payload) {
      res.json({ error: "No valid token" });
      return;
    }
  
    next();
}
