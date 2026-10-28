import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1793214973779 implements MigrationInterface {
    name = 'Auto1793214973779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking_items" DROP CONSTRAINT "FK_7cda8e9fa6d500ee23d4a69625f"`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" DROP CONSTRAINT "FK_005a21fd73b8a66b540226180d8"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_ed9c7aa7846704bbcb648377e8f"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_72dbd3365e2977161f9dec96b1a"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_9285e4f67f013d21d8d9905b1e8"`);
        await queryRunner.query(`ALTER TABLE "booking_items" RENAME COLUMN "timeSlotId" TO "time_slot_id"`);
        await queryRunner.query(`ALTER TABLE "time_slots" RENAME COLUMN "match_date" TO "is_active"`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" DROP COLUMN "pitch_id"`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" DROP COLUMN "end_time"`);
        await queryRunner.query(`ALTER TABLE "venues" ADD "owner_id" uuid`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" ADD "start_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" ADD "end_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_slots" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "time_slots" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "venues" ADD CONSTRAINT "FK_8cb5cf3df16fc75663f85b5b35c" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_items" ADD CONSTRAINT "FK_962acfc4b8ce2308145e6bd9f3a" FOREIGN KEY ("time_slot_id") REFERENCES "time_slots"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_ed9c7aa7846704bbcb648377e8f" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_72dbd3365e2977161f9dec96b1a" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_9285e4f67f013d21d8d9905b1e8" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_9285e4f67f013d21d8d9905b1e8"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_72dbd3365e2977161f9dec96b1a"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_ed9c7aa7846704bbcb648377e8f"`);
        await queryRunner.query(`ALTER TABLE "booking_items" DROP CONSTRAINT "FK_962acfc4b8ce2308145e6bd9f3a"`);
        await queryRunner.query(`ALTER TABLE "venues" DROP CONSTRAINT "FK_8cb5cf3df16fc75663f85b5b35c"`);
        await queryRunner.query(`ALTER TABLE "time_slots" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "time_slots" ADD "is_active" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "venues" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" ADD "end_time" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" ADD "start_time" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" ADD "pitch_id" uuid`);
        await queryRunner.query(`ALTER TABLE "time_slots" RENAME COLUMN "is_active" TO "match_date"`);
        await queryRunner.query(`ALTER TABLE "booking_items" RENAME COLUMN "time_slot_id" TO "timeSlotId"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_9285e4f67f013d21d8d9905b1e8" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_72dbd3365e2977161f9dec96b1a" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_ed9c7aa7846704bbcb648377e8f" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurring_schedules" ADD CONSTRAINT "FK_005a21fd73b8a66b540226180d8" FOREIGN KEY ("pitch_id") REFERENCES "pitches"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_items" ADD CONSTRAINT "FK_7cda8e9fa6d500ee23d4a69625f" FOREIGN KEY ("timeSlotId") REFERENCES "time_slots"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
