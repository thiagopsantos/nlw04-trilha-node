import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUsers1614162070437 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'nvarchar',
                    },
                    {
                        name: "updated_at",
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: "created_at",
                        type: 'timestamp',
                        default: 'now()',
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
