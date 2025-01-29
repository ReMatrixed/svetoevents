# Stage 1: Build stage
FROM golang:1.23-alpine AS base

# Этап deps предназначен для кеширования зависимостей
FROM base AS deps

# Назначение рабочей директории
WORKDIR /app

# Установка зависимостей
COPY go.mod go.sum ./
RUN go mod download

# Этап builder предназначен для сборки приложения
FROM deps AS builder

# Назначение рабочего каталога
WORKDIR /app

# Копирование файлов исходного кода
COPY . .

# Сборка приложения
RUN CGO_ENABLED=0 GOOS=linux go build -o backend .

# Этап runner предназначен для запуска приложения
FROM alpine:3.21 AS runner

# Назначение рабочего каталога
WORKDIR /app

# Копирование собранного приложения
COPY --from=builder /app/backend .

# Установка зависимостей
RUN apk --no-cache add ca-certificates tzdata

# Открытие порта
EXPOSE 8000

# Set the entrypoint command
CMD ["sh", "-c", "/app/backend"]