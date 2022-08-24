import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsInWorkspaceTable1661342217729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE workspaces ADD COLUMN default_channel VARCHAR(50)`);
        await queryRunner.query(`ALTER TABLE workspaces ADD COLUMN updated_at TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE workspaces DROP COLUMN default_channel`);
        await queryRunner.query(`ALTER TABLE workspaces DROP COLUMN updated_at`);
    }

}
