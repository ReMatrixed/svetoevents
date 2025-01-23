"use client";

import { Home, Mail, UserRound } from "lucide-react";
import NextImage from "next/image";

import DeveloperLogo from "@/assets/developer.svg";
import { Button } from "@/components/ui/button";

export function PageFooter() {
  return (
    <footer className="w-full mt-52 border-t">
      <div className="flex h-full justify-between items-center p-3">
        <a href="https://matrixed.ru">
          <NextImage
            className="w-16 hover:scale-110 transition-all duration-300"
            src={DeveloperLogo}
            alt="Логотип разработчика"
            priority
          />
        </a>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => location.href = "https://matrixed.ru"}
            aria-label="Официальный сайт разработчика"
          >
            <Home aria-label="Значок дома" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => location.href = "https://gravatar.com/rematrixed"}
            aria-label="Персональная страница разработчика"
          >
            <UserRound aria-label="Значок пользователя" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => location.href = "mailto:mat.vasenin@yandex.ru"}
            aria-label="Написать электронное письмо разработчику"
          >
            <Mail aria-label="Значок письма" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
