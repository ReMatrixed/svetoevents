import { create } from "zustand";

import { IEvent } from "@/lib/types";

interface EventDrawerState {
  opened: boolean;
  data: IEvent;
  setState: (opened: boolean) => void;
  setData: (data: IEvent) => void;
}

export const useEventDrawerStore = create<EventDrawerState>()(
  (set) => ({
    opened: false,
    data: {
      id: "ID",
      title: "Название мероприятия",
      description: "Описание мероприятия",
      date: new Date(),
      location: "Место проведения мероприятия",
      category: "категория",
      rating: 0,
      image: "",
      on_edit: false,
    },
    setState: (opened) => set({ opened }),
    setData: (data) => set({ data }),
  })
);
