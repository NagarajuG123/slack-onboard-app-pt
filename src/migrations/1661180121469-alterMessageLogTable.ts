import {MigrationInterface, QueryRunner} from "typeorm";

export class alterMessageLogTable1661180121469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message-log" ADD COLUMN sender_whatsapp VARCHAR(10)`);
        await queryRunner.query(`ALTER TABLE "message-log" RENAME COLUMN created_on TO received_on`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message-log DROP COLUMN sender_whatsapp"`);
        await queryRunner.query(`ALTER TABLE "message-log" RENAME COLUMN received_on TO created_on`);
    }

}
