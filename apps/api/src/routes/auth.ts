import { Router, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import {
  hashPassword,
  verifyPassword,
  createAccessToken,
  createRefreshToken,
  hashRefreshToken,
  getRefreshExpiry,
  toUserResponse,
} from "../lib/auth.js";
import { setRefreshCookie, clearRefreshCookie, getRefreshCookie } from "../lib/cookies.js";
import { authenticateToken } from "../middleware/auth.js";
import type { AuthUser } from "../middleware/auth.js";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const rateLimitHandler = (_req: Request, res: Response): void => {
  res.status(429).json({ error: "Too many attempts, try again later." });
};

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  handler: rateLimitHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  handler: rateLimitHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  handler: rateLimitHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRouter = Router();

authRouter.post("/signup", signupLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  const accessToken = createAccessToken({ id: user.id, email: user.email });
  const refreshToken = createRefreshToken();
  const expiresAt = getRefreshExpiry();

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt,
    },
  });

  setRefreshCookie(res, refreshToken);
  res.status(201).json({
    accessToken,
    user: toUserResponse(user),
  });
});

authRouter.post("/login", loginLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const accessToken = createAccessToken({ id: user.id, email: user.email });
  const refreshToken = createRefreshToken();
  const expiresAt = getRefreshExpiry();

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt,
    },
  });

  setRefreshCookie(res, refreshToken);
  res.json({
    accessToken,
    user: toUserResponse(user),
  });
});

authRouter.post("/refresh", refreshLimiter, async (req: Request, res: Response): Promise<void> => {
  const token = getRefreshCookie(req);
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const tokenHash = hashRefreshToken(token);
  const stored = await prisma.session.findFirst({
    where: { tokenHash },
    include: { user: true },
  });

  if (!stored || stored.expiresAt < new Date()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  await prisma.session.delete({ where: { id: stored.id } });

  const newRefreshToken = createRefreshToken();
  const expiresAt = getRefreshExpiry();

  await prisma.session.create({
    data: {
      userId: stored.userId,
      tokenHash: hashRefreshToken(newRefreshToken),
      expiresAt,
    },
  });

  const accessToken = createAccessToken({ id: stored.user.id, email: stored.user.email });
  setRefreshCookie(res, newRefreshToken);

  prisma.session
    .deleteMany({
      where: {
        userId: stored.userId,
        expiresAt: { lt: new Date() },
      },
    })
    .catch(() => {});

  res.json({
    accessToken,
    user: toUserResponse(stored.user),
  });
});

authRouter.post("/logout", async (req: Request, res: Response): Promise<void> => {
  const token = getRefreshCookie(req);
  if (token) {
    const tokenHash = hashRefreshToken(token);
    await prisma.session.deleteMany({ where: { tokenHash } });
  }
  clearRefreshCookie(res);
  res.status(204).send();
});

authRouter.get("/me", authenticateToken, async (req: Request & { user?: AuthUser }, res: Response): Promise<void> => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const fullUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!fullUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.json({ user: toUserResponse(fullUser) });
});
