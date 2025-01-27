"use client";

import NextImage from "next/image";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { shimmerEffect } from "@/lib/shimmer";
import { toBase64 } from "@/lib/utils";
import { useEventDrawerStore } from "@/store/eventDrawer";

export function EventDrawer() {
  const drawerState = useEventDrawerStore(
    (state) => state.opened
  );
  const setDrawerState = useEventDrawerStore(
    (state) => state.setState
  );
  const eventData = useEventDrawerStore(
    (state) => state.data
  );
  return (
    <Drawer
      open={drawerState}
      onClose={() => setDrawerState(false)}
    >
      <DrawerContent className="h-1/2">
        <DrawerHeader>
          <DrawerTitle>
            <p>
              Сведения о мероприятии
            </p>
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="rounded-md overflow-hidden">
            <NextImage
              className="hover:scale-125 transition-all duration-500"
              src={"/api/upload/img/" + eventData.id + "/" + eventData.image}
              width={300}
              height={200}
              alt="Изображение мероприятия"
              placeholder={
                `data:image/svg+xml;base64,${toBase64(shimmerEffect(700, 475))}`
              }
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
