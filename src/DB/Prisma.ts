// infrastructure/prisma/prisma.service.ts
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$connect(); // Conectar automáticamente al instanciar
  }

  async disconnect() {
    await this.$disconnect();
  }
}

// Singleton para reutilizar la instancia
export const prismaService = new PrismaService();