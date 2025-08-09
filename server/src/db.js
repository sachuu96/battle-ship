import { PrismaClient } from "@prisma/client";

class DatabaseClient {
  static prismaInstance;

  constructor() {
    if (!DatabaseClient.prismaInstance) {
        DatabaseClient.prismaInstance = new PrismaClient();
    }
  }

  getInstance() {
    return DatabaseClient.prismaInstance;
  }
}

export const prisma = new DatabaseClient().getInstance();