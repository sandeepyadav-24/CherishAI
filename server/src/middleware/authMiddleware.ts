// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify the token and attach the decoded payload to `req.user`
    const decoded = jwt.verify(token, "password_nextauth") as jwt.JwtPayload;
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
