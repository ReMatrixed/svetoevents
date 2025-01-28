"use client";

import NextImage from "next/image";
import { useState } from "react";

import placeholder from "@/assets/placeholder.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shimmerEffect } from "@/lib/shimmer";
import { IEvent } from "@/lib/types";
import { toBase64 } from "@/lib/utils";
import { useEventDrawerStore } from "@/store/eventDrawer";

export function EventCard(event: IEvent) {
  const setDrawerState = useEventDrawerStore(
    (state) => state.setState
  );
  const setDrawerData = useEventDrawerStore(
    (state) => state.setData
  );
  const [errorState, setErrorState] = useState<boolean>(false);
  const imageUrl = errorState
    ? placeholder
    : "/api/upload/img/" + event.id + "/" + event.image;

  return (
    <Card className="h-[350px]">
      <CardHeader>
        <CardTitle>
          {event.title}
        </CardTitle>
        <CardDescription
          className="line-clamp-2"
        >
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-5">
          <div className="rounded-md overflow-hidden">
            <NextImage
              style={{ objectFit: "fill", width: 270, height: 180 }}
              className="hover:scale-125 transition-all duration-500"
              src={imageUrl}
              alt="Изображение мероприятия"
              width={300}
              height={200}
              placeholder={
                `data:image/svg+xml;base64,${toBase64(shimmerEffect(300, 200))}`
              }
              onError={() => setErrorState(true)}
            />
          </div>
          <Button
            onClick={() => {
              setDrawerData(event);
              setDrawerState(true);
            }}
            className="w-full"
          >
            Узнать больше
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
