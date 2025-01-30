"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { addDays, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { LucideBan, LucideLoader2 } from "lucide-react";
import { useMemo, useState } from "react";
import useSWR from "swr";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { fetcher } from "@/lib/api";
import { IEvent } from "@/lib/types";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface responseSchemeCalendar {
  dates: string[];
}

interface responseSchemeSearch {
  events: IEvent[];
}

interface propsSearchResults {
  events: IEvent[] | undefined;
  error: boolean;
  isLoading: boolean;
}

function SearchResults({ events, error, isLoading }: propsSearchResults) {
  if(isLoading) {
    return (
      <Skeleton className="h-10" />
    );
  }
  if(error) {
    return (
      <p>
        error
      </p>
    );
  }
  return (
    <>
      {events!.map((event) => {
        return (
          <p key={event.id}>
            {event.title}
          </p>
        );
      })}
    </>
  );
}

export function EventCalendar() {
  const [
    selectedDate, setSelectedDate,
  ] = useState<Date | undefined>(new Date());
  const [isResultsLoading, setResultsLoading] = useState<boolean>(false);

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
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useSWR<responseSchemeSearch>(
    "search/date?" + new URLSearchParams({
      amount: "5",
      request: selectedDate!.toISOString(),
    }).toString(),
    fetcher,
    {
      fallbackData: { events: [] },
      revalidateOnMount: false,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  if(datesError) {
    return (
      <div className="flex flex-col gap-3">
        <Card className="p-5 text-center">
          <p>
            Ближайшие мероприятия
          </p>
        </Card>
        <Card className="h-[350px]">
          <VisuallyHidden>
            <CardTitle>
              Ошибка загрузки мероприятий
            </CardTitle>
          </VisuallyHidden>
          <CardContent className="h-[350px]">
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
  if(datesLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Card className="p-5 text-center">
          <p>
            Календарь мероприятий
          </p>
        </Card>
        <Skeleton className="h-[320px] rounded-xl" />
        <Skeleton className="h-9" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <Card className="p-5 text-center">
        <p>
          Календарь мероприятий
        </p>
      </Card>
      <Calendar
        className="h-[320px] border p-5 rounded-xl shadow-sm"
        required
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={ru}
        modifiers={{
          highlight: datesData!.dates.map((dateStr): Date => new Date(dateStr)),
        }}
        modifiersClassNames={{
          highlight: "after:h-[3px] after:w-2/3 after:absolute after:bottom-1 after:bg-green-600 after:rounded-sm",
        }}
        fromDate={subDays(currentDate, 90)}
        toDate={addDays(currentDate, 90)}
      />
      <Button
        disabled={selectedDate === undefined}
        onClick={() => {
          setResultsLoading(true);
        }}
      >
        {
          isResultsLoading
            && <LucideLoader2 strokeWidth={3} className="animate-spin" />
        }
        {!isResultsLoading && "Искать"}
      </Button>
      <SearchResults
        events={searchData?.events}
        error={searchError}
        isLoading={searchLoading}
      />
    </div>
  );
}
