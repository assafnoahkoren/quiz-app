import { Request, Response, NextFunction } from "express";
import jwt from "jwt-simple";

export const validUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  
  if (process.env.NODE_ENV === "development") {
    req.currentUserId = 'clw29uze30000ryilcveoqm17';
    return next();
  }

  const token = req.headers.authorization;

  let payload;
  try {
    payload = jwt.decode(token!, process.env.JWT_SECRET!);
    req.currentUserId = payload.id;
  } catch (error) {
    res.json({ error });
    return;
  }

  if (!payload) {
    res.json({ error: "No valid token" });
    return;
  }

  next();
};
