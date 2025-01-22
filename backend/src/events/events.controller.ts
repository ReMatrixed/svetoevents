import { Controller, Get, Query } from "@nestjs/common";
import { Event as EventModel } from "@prisma/client";

import { GetUpcomingDto } from "./dto/events.dto";
import { EventsService } from "./events.service";

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("upcoming")
  async getUpcomingEvents(
    @Query() query: GetUpcomingDto
  ): Promise<EventModel[]> {
    return await this.eventsService.getUpcoming(query.amount);
  }
}
