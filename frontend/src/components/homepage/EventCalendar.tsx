"use client";

import { addDays, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { LucideLoader2 } from "lucide-react";
import { useMemo, useState } from "react";
import useSWR from "swr";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { fetcher } from "@/lib/api";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface responseScheme {
  dates: string[];
}

export function EventCalendar() {
  const [
    selectedDate, setSelectedDate,
  ] = useState<Date | undefined>(new Date());
  const [isResultsLoading, setResultsLoading] = useState<boolean>(false);

  const currentDate = useMemo(() => new Date(), []);

  const { data, error, isLoading } = useSWR<responseScheme>(
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

  if(error) {
    return (
      <></>
    );
  }
  if(isLoading) {
    return (
      <Skeleton />
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
        className="rounded-xl border shadow-sm p-5"
        required
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={ru}
        modifiers={{
          highlight: data!.dates.map((dateStr): Date => new Date(dateStr)),
        }}
        modifiersClassNames={{
          highlight: "after:h-[3px] after:w-2/3 after:absolute after:bottom-1 after:bg-green-600 after:rounded-sm",
        }}
        fromDate={subDays(currentDate, 90)}
        toDate={addDays(currentDate, 90)}
      />
      <Button
        disabled={selectedDate === undefined}
        onClick={() => setResultsLoading(true)}
      >
        {
          isResultsLoading
            && <LucideLoader2 strokeWidth={3} className="animate-spin" />
        }
        {!isResultsLoading && "Искать"}
      </Button>
    </div>
  );
}
