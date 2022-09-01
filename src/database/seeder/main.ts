import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then((appContext) => {
            const logger = appContext.get(Logger);
            const seeder = appContext.get(SeederService);
            seeder
                .seed()
                .then(() => {
                    logger.log('Seeding Done', 'SeederService');
                    return;
                })
                .catch((error) => {
                    logger.error('Seeding Failed.', 'SeederService');
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch((error) => {
            throw error;
        });
}

bootstrap();
