import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { toUserResponse } from "../lib/auth.js";
import { authenticateToken } from "../middleware/auth.js";
import type { AuthUser } from "../middleware/auth.js";

const updateProfileSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    avatarUrl: z.string().url().nullable().optional(),
  })
  .refine((data) => data.name !== undefined || data.avatarUrl !== undefined, {
    message: "At least one field (name or avatarUrl) is required",
  });

export const usersRouter = Router();

usersRouter.patch(
  "/me",
  authenticateToken,
  async (req: Request & { user?: AuthUser }, res: Response): Promise<void> => {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const data: { name?: string; avatarUrl?: string | null } = {};
    if (parsed.data.name !== undefined) data.name = parsed.data.name;
    if (parsed.data.avatarUrl !== undefined) data.avatarUrl = parsed.data.avatarUrl;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data,
    });

    res.json({ user: toUserResponse(updated) });
  }
);
