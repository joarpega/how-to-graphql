import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { IContext } from './models';
import { decodeAuthHeader } from './utils/auth/auth';

export const prisma = new PrismaClient();

export const context = ({ req }: { req: Request }): IContext => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
  };
};
