import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { AddEventDto, GetUpcomingDto, SearchByDateDto, SearchByTitleDto } from "./dto/events.dto";
import { EventsService } from "./events.service";

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("upcoming")
  async getUpcomingEvents(
    @Query() query: GetUpcomingDto
  ) {
    return {
      events: await this.eventsService.getUpcoming(query.amount),
    };
  }

  @Get("search/title")
  async getEventsByTitle(
    @Query() query: SearchByTitleDto
  ) {
    return {
      events: await this.eventsService.searchByTitle(
        query.amount,
        query.request
      ),
    };
  }

  @Get("search/date")
  async getEventsByDate(
    @Query() query: SearchByDateDto
  ) {
    return {
      events: await this.eventsService.searchByDate(
        query.amount, new Date(query.date)
      ),
    };
  }

  @Post("event")
  async postEvent(
    @Body() body: AddEventDto
  ) {
    return {
      success: await this.eventsService.addEvent(
        body.title,
        body.description,
        new Date(body.date),
        body.category,
        body.rating,
        body.location,
        body.image
      ),
    };
  }
}
