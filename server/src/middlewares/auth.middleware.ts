import { Request, Response, NextFunction } from "express";
import jwt from "jwt-simple";

export const validUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization;

  if (process.env.NODE_ENV === "development" && !token) {
    req.currentUserId = 'clw29uze30000ryilcveoqm17';
    req.currentUserRoles = ['admin']
    return next();
  }


  let payload;
  try {
    payload = jwt.decode(token!, process.env.JWT_SECRET!);
    req.currentUserId = payload.id;
    req.currentUserRoles = payload.roles
  } catch (error) {
    res.json({ error: 'Bad Jwt' });
    return;
  }

  if (!payload) {
    res.json({ error: "No valid token" });
    return;
  }

  next();
};
