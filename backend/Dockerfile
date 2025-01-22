# Этап base предназначен для сборки системного образа
FROM node:22-alpine AS base

# Установка системных зависимостей (по требованию)
FROM base AS deps
# Установка libc6-compat для решения проблем совместимости
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Установка зависимостей backend'а
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Этап builder предназначен для сборки backend'а
FROM base AS builder

# Назначение рабочего каталога
WORKDIR /app
# Копирование собранных зависимостей backend'а
COPY --from=deps /app/node_modules ./node_modules
# Копирование исходных файлов
COPY . .

# Сборка контейнера с кодом backend'а
RUN corepack enable pnpm && pnpm run build

# Этап runner предназначен для развертывания backend'а 
FROM base AS runner
WORKDIR /app

# Цель сборки - production
ENV NODE_ENV=production

# Создание пользователя и группы
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Копирование собранного backend'а
COPY --chown=nestjs:nodejs --from=builder /app/dist ./dist
COPY --chown=nestjs:nodejs --from=deps /app/node_modules ./node_modules

# Выбор пользователя для работы
USER nestjs

# Открытие порта для доступа к backend'у
EXPOSE 8000

# Запуск сервера backend'а
CMD ["node", "dist/main"]