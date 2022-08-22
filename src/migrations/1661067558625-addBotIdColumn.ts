import {MigrationInterface, QueryRunner} from "typeorm";

export class addBotIdColumn1661067558625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE workspaces ADD bot_id VARCHAR(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE workspaces DROP bot_id`);
    }

}
