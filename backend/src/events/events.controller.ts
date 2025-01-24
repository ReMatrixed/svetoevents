import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { join } from "path";
import { imageFileFilter } from "src/lib/utils/filefilter";
import { v4 as uuidv4 } from "uuid";

import { AddEventDto, getEventByIdDto, GetUpcomingDto, SearchByDateDto, SearchByTitleDto } from "./dto/events.dto";
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
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: join(__dirname, "..", "..", "upload"),
      filename: function (req, file, cb) {
        cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
      },
    }),
    limits: {
      fileSize: 1000 * 1000 * 2,
    },
    fileFilter: imageFileFilter,
  }))
  async postEvent(
    @Body() body: AddEventDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return {
      success: await this.eventsService.addEvent(
        body.title,
        body.description,
        new Date(body.date),
        body.category.toLowerCase(),
        body.rating,
        body.location,
        file.filename
      ),
    };
  }

  @Get("event")
  async getEventById(
    @Query() query: getEventByIdDto
  ) {
    return await this.eventsService.getEventById(query.id);
  }
}
