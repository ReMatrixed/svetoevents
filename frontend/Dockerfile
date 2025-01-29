# Этап base предназначен для сборки системного образа
FROM node:22-alpine AS base

# Установка системных зависимостей (по требованию)
FROM base AS deps
# Установка libc6-compat для решения проблем совместимости
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Установка зависимостей frontend'а
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Этап builder предназначен для сборки frontend'а
FROM base AS builder

# Назначение рабочего каталога
WORKDIR /app
# Копирование собранных зависимостей frontend'а
COPY --from=deps /app/node_modules ./node_modules
# Копирование исходных файлов
COPY . .

# Отключение телеметрии NEXT.js
ENV NEXT_TELEMETRY_DISABLED=1

# Сборка контейнера с кодом frontend'а
RUN corepack enable pnpm && pnpm run build

# Этап runner предназначен для развертывания frontend'а 
FROM base AS runner
WORKDIR /app

# Цель сборки - production
ENV NODE_ENV=production

# Отключение телеметрии NEXT.js (повторно)
ENV NEXT_TELEMETRY_DISABLED=1

# Создание пользователя и группы
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копирование файлов после сборки node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Выбор пользователя для работы
USER nextjs

# Открытие порта для доступа к frontend'у
EXPOSE 3000

# Назначение целевого порта в переменной окружения
ENV PORT=3000

# Назначение целевого адреса в переменной окружения
ENV HOSTNAME="0.0.0.0"

# Запуск сервера frontend'а
# Примечание: server.js создается с помощью next build
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]