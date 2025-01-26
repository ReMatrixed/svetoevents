package handlers

import (
	"fmt"
	"net/http"
	"strings"
	"svetoevents/backend/db"
	"svetoevents/backend/models"
	"time"

	"github.com/labstack/echo/v4"
)

func GetUpcomingEvents(c echo.Context) error {
	type GetUpcomingEventsDto struct {
		Amount int `query:"amount" validate:"required,gte=1,lte=16"`
	}
	var params GetUpcomingEventsDto
	if err := c.Bind(&params); err != nil {
		return err
	}
	if err := c.Validate(params); err != nil {
		return err
	}

	var events []models.Event
	db.DB.Order("date asc").Limit(params.Amount).Find(&events)
	return c.JSON(http.StatusOK, map[string]interface{}{
		"events": events,
	})
}

func GetEventsByDate(c echo.Context) error {
	type GetEventsByDateDto struct {
		Amount  int    `query:"amount" validate:"required,gte=1,lte=16"`
		Request string `query:"date" validate:"required,omitempty"`
	}
	var params GetEventsByDateDto
	if err := c.Bind(&params); err != nil {
		return err
	}
	if err := c.Validate(params); err != nil {
		return err
	}
	searchDate, err := time.Parse(time.RFC3339, params.Request)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	var events []models.Event
	db.DB.Order("date asc").
		Limit(params.Amount).
		Where("date BETWEEN ? AND ?", searchDate, searchDate.AddDate(0, 0, 1)).
		Find(&events)
	return c.JSON(http.StatusOK, map[string]interface{}{
		"events": events,
	})
}

func GetEventsByTitle(c echo.Context) error {
	type GetEventsByTitleDto struct {
		Amount  int    `query:"amount" validate:"required,gte=1,lte=16"`
		Request string `query:"request" validate:"required,min=1,max=64"`
	}
	var params GetEventsByTitleDto
	if err := c.Bind(&params); err != nil {
		return err
	}
	if err := c.Validate(params); err != nil {
		return err
	}

	var events []models.Event
	db.DB.Order("date asc").
		Limit(params.Amount).
		Where(
			"UPPER(title) LIKE ?",
			fmt.Sprintf("%%%s%%", strings.ToUpper(params.Request)),
		).
		Find(&events)
	return c.JSON(http.StatusOK, map[string]interface{}{
		"events": events,
	})
}
