import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface IContext {
  prisma: PrismaClient
}

export const context: IContext = {
  prisma
}
