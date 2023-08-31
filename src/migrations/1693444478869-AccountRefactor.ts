import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountRefactor1693444478869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" RENAME COLUMN "address" TO "wallet_address"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" RENAME COLUMN "wallet_address" TO "address"`,
    );
  }
}
