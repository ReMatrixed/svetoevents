package main

import (
	"fmt"
	"log"
	"net/http"
	"svetoevents/backend/db"
	"svetoevents/backend/handlers"
	"svetoevents/backend/models"
	"svetoevents/backend/utils"

	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/time/rate"
)

type GenericValidator struct {
	Validator *validator.Validate
}

func (cv *GenericValidator) Validate(i interface{}) error {
	err := cv.Validator.Struct(i)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file is present. Skipping...")
	}

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s",
		utils.GetEnv("POSTGRESQL_HOST", "localhost"),
		utils.GetEnv("POSTGRESQL_USERNAME", "postgres"),
		utils.GetEnv("POSTGRESQL_PASSWORD", "postgres"),
		utils.GetEnv("POSTGRESQL_DB", "postgres"),
		utils.GetEnv("POSTGRESQL_PORT", "5432"),
	)
	err := db.Connect(dsn)
	if err != nil {
		panic("failed to connect database")
	}
	log.Println("Database has been connected.")

	// Запустить миграцию БД
	db.DB.AutoMigrate(&models.Event{})
	log.Println("AutoMigration completed.")

	// Инициализация API-сервера
	e := echo.New()
	e.Validator = &GenericValidator{
		Validator: validator.New(),
	}

	// Подключение middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Use(middleware.RateLimiter(
		middleware.NewRateLimiterMemoryStore(rate.Limit(20)),
	))

	// Назначение путей (routing)
	e.Static("/upload", "upload")
	e.GET("/upcoming", handlers.GetUpcomingEvents)
	e.GET("/event/dates", handlers.GetEventDates)
	e.GET("/search/date", handlers.GetEventsByDate)
	e.GET("/search/title", handlers.GetEventsByTitle)

	// Запуск сервера
	e.Logger.Fatal(e.Start(":8000"))
}
