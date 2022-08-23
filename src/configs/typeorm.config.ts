import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => {
        const logging =
            configService.get<string>('nodeEnv') === 'development'
                ? true
                : false;
        return {
            type: 'postgres',
            host: configService.get<string>('database.host'),
            port: configService.get<number>('database.port'),
            username: configService.get<string>('database.username'),
            password: configService.get<string>('database.password'),
            database: configService.get<string>('database.name'),
            logging: false,
            synchronize: false,
            autoLoadEntities: true,
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            entities: [`${__dirname}/../**/*.entity.{js,ts}`],
        };
    },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    logging: true,
    synchronize: false,
    migrationsRun:true,
    entities: [`${__dirname}/../**/*.model.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.{js,ts}`],
};
