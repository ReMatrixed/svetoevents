"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Autoplay from "embla-carousel-autoplay";
import { LucideBan } from "lucide-react";
import useSWR from "swr";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcher } from "@/lib/api";
import { IEvent } from "@/lib/types";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { EventCard } from "./EventCard";

interface responseScheme {
  events: IEvent[];
}

export function UpcomingCarousel() {
  const { data, error, isLoading } = useSWR<responseScheme>(
    "upcoming?amount=5",
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  if(isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Card className="p-5 text-center">
          <p>
            Ближайшие мероприятия
          </p>
        </Card>
        <Skeleton className="h-[360px] rounded-xl" />
      </div>
    );
  }
  if(error) {
    return (
      <div className="flex flex-col gap-3">
        <Card className="p-5 text-center">
          <p>
            Ближайшие мероприятия
          </p>
        </Card>
        <Card className="h-[360px]">
          <VisuallyHidden>
            <CardTitle>
              Ошибка загрузки мероприятий
            </CardTitle>
          </VisuallyHidden>
          <CardContent className="h-[360px]">
            <div className="flex flex-col h-full items-center justify-center gap-3">
              <LucideBan size={48}/>
              <h1 className="text-center">
                Ошибка загрузки
              </h1>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <Card className="p-5 text-center">
        <p>
          Ближайшие мероприятия
        </p>
      </Card>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="mb-2">
          {data?.events.map((event: IEvent) => {
            console.log(event);
            return (
              <CarouselItem key={event.id}>
                <EventCard
                  {...event}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-7" />
        <CarouselNext className="mr-7" />
      </Carousel>
    </div>
  );
}
