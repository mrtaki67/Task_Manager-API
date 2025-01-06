import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // conecta ao banco de dados
    async onModuleInit() {
        await this.$connect();
        console.log("Conectando ao banco de dados...")
    }

    // desconecta a conexão com o banco de dados
    async onModuleDestroy() {
        await this.$disconnect();
    }
}
