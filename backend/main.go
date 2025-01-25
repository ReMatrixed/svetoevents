package main

import (
	"fmt"
	"log"
	"svetoevents/backend/internal/api"
	"svetoevents/backend/internal/database"
	"svetoevents/backend/internal/models"
	"svetoevents/backend/internal/utils"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s",
		utils.GetEnv("POSTGRESQL_HOST", "localhost"),
		utils.GetEnv("POSTGRESQL_USERNAME", "postgres"),
		utils.GetEnv("POSTGRESQL_PASSWORD", "postgres"),
		utils.GetEnv("POSTGRESQL_DB", "postgres"),
		utils.GetEnv("POSTGRESQL_PORT", "5432"),
	)
	if err := database.Connect(dsn); err != nil {
		panic("failed to connect database")
	}

	// Запустить миграцию БД
	database.DB.AutoMigrate(&models.Event{})

	database.DB.Create(&models.Event{
		ID:          uuid.New(),
		Title:       "New Event",
		Description: "Just an another event",
		Date:        time.Now().UTC(),
		Category:    "ABSOLUTE",
		Location:    "Best House Ever",
		Rating:      0,
		OnEdit:      false,
	})

	// Инициализация API-сервера
	e := echo.New()
	e.Validator = &utils.CustomValidator{
		Validator: validator.New(),
	}
	e.Static("/upload", "upload")
	e.GET("/upcoming", api.EventGetUpcoming)
	e.GET("/search/date", api.EventSearchByDate)
	e.Logger.Fatal(e.Start(":8000"))
}
