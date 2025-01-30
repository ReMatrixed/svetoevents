"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { addDays, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { LucideBan, LucideLoader2 } from "lucide-react";
import { useMemo, useState } from "react";
import useSWR from "swr";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { baseUrl, fetcher } from "@/lib/api";
import { IEvent } from "@/lib/types";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { EventCardMinimal } from "./EventCard";

interface responseSchemeCalendar {
  dates: string[];
}
interface responseSchemeSearch {
  available: number;
  events: IEvent[];
}

export function EventCalendar() {
  const [
    selectedDate, setSelectedDate,
  ] = useState<Date | undefined>(new Date());
  const [isResultsLoading, setResultsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<IEvent[]>([]);
  const [searchAvailable, setSearchAvailable] = useState<number>(3);
  const [searchLimit, setSearchLimit] = useState<number>(3);

  const currentDate = useMemo(() => new Date(), []);

  const {
    data: datesData,
    error: datesError,
    isLoading: datesLoading,
  } = useSWR<responseSchemeCalendar>(
    "event/dates?" + new URLSearchParams({
      start: subDays(currentDate, 90).toISOString(),
      end: addDays(currentDate, 90).toISOString(),
    }).toString(),
    fetcher,
    {
      fallbackData: { dates: [] },
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const fetchEvents = (): void => {
    fetch(`${baseUrl}/search/date?` + new URLSearchParams({
      amount: searchLimit.toString(),
      request: selectedDate!.toISOString(),
    }))
      .then(res => res.json())
      .then((data: responseSchemeSearch) => {
        setSearchResults(data.events);
        setSearchAvailable(data.available);
      })
      .catch(error => console.log(error));
  };

  if(datesError) {
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
              <LucideBan size={48} className="hover:rotate-90 duration-200"/>
              <h1 className="text-center">
                Ошибка загрузки
              </h1>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  else if(datesLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Card className="p-5 text-center">
          <p>
            Календарь мероприятий
          </p>
        </Card>
        <Skeleton className="h-[360px] rounded-xl" />
        <Skeleton className="h-9" />
      </div>
    );
  }
  else return (
    <div className="flex flex-col gap-3">
      <Card className="p-5 text-center">
        <p>
          Календарь мероприятий
        </p>
      </Card>
      <Calendar
        className="h-[360px] border p-5 rounded-xl shadow-sm"
        required
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={ru}
        modifiers={{
          highlight: datesData!.dates.map((dateStr): Date => new Date(dateStr)),
        }}
        modifiersClassNames={{
          highlight: "after:h-[3px] after:w-5 after:absolute after:bottom-1 after:bg-green-600 after:rounded-sm",
        }}
        disabled={{
          before: subDays(currentDate, 90),
          after: addDays(currentDate, 90),
        }}
      />
      <Button
        disabled={selectedDate === undefined}
        onClick={() => {
          setResultsLoading(true);
          fetchEvents();
          setResultsLoading(false);
        }}
      >
        {
          isResultsLoading
            && <LucideLoader2 strokeWidth={3} className="animate-spin" />
        }
        {!isResultsLoading && "Искать"}
      </Button>
      {
        searchResults.length == 0
          ? <Card className="p-5 text-center">
            <p>
              Ничего не найдено
            </p>
          </Card>
          : searchResults.map((event) => {
            return (
              <EventCardMinimal key={event.id} event={event} />
            );
          })
      }
      {
        searchResults.length > 0
          && <Card className="flex flex-col p-5 text-center gap-3">
            Отображено {searchResults.length} из {searchAvailable}
          </Card>
      }
    </div>
  );
}
