import {MigrationInterface, QueryRunner} from "typeorm";

export class alterColumnTypesUserTable1661171049202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN mobile_number TYPE VARCHAR(10)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN mobile_number TYPE INT`)
    }

}
