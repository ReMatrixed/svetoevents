"use client";

import "@/app/globals.css";

import { Moon, Search, Sun } from "lucide-react";
import NextImage from "next/image";
import { useTheme } from "next-themes";

import ProjectLogo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { useSearchModalStore } from "@/store/searchModal";

export function PageHeader() {
  const { theme, setTheme } = useTheme();
  const toggleSearchModal = useSearchModalStore(
    (state) => state.setState
  );
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full justify-between items-center p-3">
        <a href="https://events.matrixed.ru">
          <NextImage
            className="hover:scale-110 transition-all"
            src={ProjectLogo}
            width={36}
            height={36}
            alt="Логотип СветоСобытий"
            priority
          />
        </a>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              toggleSearchModal(true);
            }}
            aria-label="Поиск мероприятий"
          >
            <Search aria-label="Значок лупы" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setTheme((theme === "light") ? "dark" : "light");
            }}
            aria-label="Переключить тему оформления"
          >
            <Sun className="absolute scale-100 dark:scale-0" aria-label="Значок солнца" />
            <Moon className="absolute scale-0 dark:scale-100" aria-label="Значок луны" />
          </Button>
        </div>
      </div>
    </header>
  );
}
