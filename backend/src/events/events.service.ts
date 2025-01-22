import { Injectable } from "@nestjs/common";
import { Event } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getUpcoming(
    take: number
  ): Promise<Event[]> {
    return this.prisma.event.findMany({
      take: take,
      orderBy: {
        date: "asc",
      },
    });
  }
}
