import {MigrationInterface, QueryRunner} from "typeorm";

export class createusertable1660988711955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE users(
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255),
            unique_id VARCHAR(50) UNIQUE,
            mobile_number INT,
            availability_channel_id VARCHAR(50),
            workspace_id INT,
            user_access_token VARCHAR(255),
            created_on TIMESTAMP
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users`);
    }

}
