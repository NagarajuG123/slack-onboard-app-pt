import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInUser1661318175611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD COLUMN updated_at TIMESTAMP`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE users DROP COLUMN updated_at')
    }

}
