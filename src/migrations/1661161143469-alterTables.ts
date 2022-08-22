import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTables1661161143469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD FOREIGN KEY (workspace_id) REFERENCES workspaces ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN created_on SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE workspaces ALTER COLUMN created_on SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP CONSTRAINT fk_workspace_id`);
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN created_on DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE workspaces ALTER COLUMN created_on DROP DEFAULT`);
    }

}
