import { Injectable } from "@nestjs/common";
import { Event as EventModel } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getUpcoming(
    take: number
  ): Promise<EventModel[]> {
    return this.prisma.event.findMany({
      take: take,
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }

  async searchByTitle(
    take: number,
    request: string
  ): Promise<EventModel[]> {
    return this.prisma.event.findMany({
      take: take,
      where: {
        title: {
          contains: request,
          mode: "insensitive",
        },
      },
    });
  }

  async searchByDate(
    take: number,
    date: Date
  ): Promise<EventModel[]> {
    return this.prisma.event.findMany({
      take: take,
      where: {
        date: {
          gte: date,
          lt: new Date(date.getTime() + 60 * 60 * 24 * 1000),
        },
      },
    });
  }

  async addEvent(
    title: string,
    description: string,
    date: Date,
    category: string,
    rating: number,
    location: string,
    image: string
  ): Promise<string> {
    const uuid = uuidv4();
    await this.prisma.event.create({
      data: {
        id: uuid,
        title,
        description,
        date,
        category,
        rating,
        location,
        image,
      },
    });
    return uuid;
  }

  async updateEventImage(
    id: string,
    filename: string
  ) {
    await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        image: filename,
      },
    });
  }
}
