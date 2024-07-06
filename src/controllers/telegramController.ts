import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const telegramUserUpdateAndCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, first_name, last_name, username, language_code } = req.body;
    const user = await prisma.user.upsert({
      where: {
        telegram_id: String(id),
      },
      update: {
        name: first_name || last_name || username,
        username,
      },
      create: {
        name: first_name || last_name || username,
        username,
        telegram_id: String(id),
      },
    });

    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
