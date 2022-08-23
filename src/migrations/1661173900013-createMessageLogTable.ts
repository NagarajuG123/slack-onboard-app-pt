import {MigrationInterface, QueryRunner} from "typeorm";

export class createMessageLogTable1661173900013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message-log"(
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            message TEXT,
            created_on TIMESTAMP DEFAULT now()
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "message-log"`);
    }

}
