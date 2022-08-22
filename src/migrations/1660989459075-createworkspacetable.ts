import {MigrationInterface, QueryRunner} from "typeorm";

export class createworkspacetable1660989459075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE workspaces(
                id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                team_id VARCHAR(50) UNIQUE,
                name VARCHAR(100),
                bot_access_token VARCHAR(255),
                created_on TIMESTAMP
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'DROP TABLE workspaces'
        )
    }

}
