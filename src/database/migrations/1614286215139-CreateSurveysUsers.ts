import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614286215139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'surveys_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'survey_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: "FKSurvey",
            columnNames: ['survey_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'surveys',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: "FKUser",
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('surveys_users');
    }

}
