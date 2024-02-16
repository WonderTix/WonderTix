-- DropForeignKey
ALTER TABLE "ticketrestrictions" DROP CONSTRAINT "ticketrestrictions_eventinstanceid_fk_fkey";

-- AddForeignKey
ALTER TABLE "ticketrestrictions" ADD CONSTRAINT "ticketrestrictions_eventinstanceid_fk_fkey" FOREIGN KEY ("eventinstanceid_fk") REFERENCES "eventinstances"("eventinstanceid") ON DELETE NO ACTION ON UPDATE NO ACTION;
