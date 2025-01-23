import { Body, Controller, Get, Post } from "@nestjs/common";

import { AddEventDto, GetUpcomingDto, SearchByDateDto, SearchByTitleDto } from "./dto/events.dto";
import { EventsService } from "./events.service";

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("upcoming")
  async getUpcomingEvents(
    @Body() body: GetUpcomingDto
  ) {
    return {
      events: await this.eventsService.getUpcoming(body.amount),
    };
  }

  @Get("search/title")
  async getEventsByTitle(
    @Body() body: SearchByTitleDto
  ) {
    return {
      events: await this.eventsService.searchByTitle(
        body.amount,
        body.request
      ),
    };
  }

  @Get("search/date")
  async getEventsByDate(
    @Body() body: SearchByDateDto
  ) {
    return {
      events: await this.eventsService.searchByDate(
        body.amount, new Date(body.date)
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
