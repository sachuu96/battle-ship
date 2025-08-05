// TODO: add singleton pattern to make sure only one instance is created through out the application
import { PrismaClient } from'@prisma/client';
export const prisma = new PrismaClient();
