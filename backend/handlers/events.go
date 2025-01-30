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
	db.DB.Order("date ASC").
		Limit(params.Amount).
		Find(&events)
	return c.JSON(http.StatusOK, map[string]interface{}{
		"events": events,
	})
}

func GetEventDates(c echo.Context) error {
	type GetEventDatesDto struct {
		Start string `query:"start" validate:"required,omitempty"`
		End   string `query:"end" validate:"required,omitempty"`
	}
	var params GetEventDatesDto
	if err := c.Bind(&params); err != nil {
		return err
	}
	if err := c.Validate(params); err != nil {
		return err
	}
	startDate, err := time.Parse(time.RFC3339, params.Start)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	endDate, err := time.Parse(time.RFC3339, params.End)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	endDate = endDate.AddDate(0, 0, 1)

	var dates []time.Time
	db.DB.Model(&models.Event{}).
		Distinct("date").
		Where("date >= ? AND date < ?", startDate, endDate).
		Order("date ASC").
		Select("date").
		Find(&dates)
	return c.JSON(http.StatusOK, map[string]interface{}{
		"dates": dates,
	})
}

func GetEventsByDate(c echo.Context) error {
	type GetEventsByDateDto struct {
		Amount  int    `query:"amount" validate:"required,gte=1"`
		Request string `query:"request" validate:"required,omitempty"`
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
	var available int64
	db.DB.Order("date ASC").
		Where("date >= ? and date < ?", searchDate, searchDate.AddDate(0, 0, 1)).
		Limit(params.Amount).
		Find(&events)

	db.DB.Model(&models.Event{}).
		Where("date >= ? and date < ?", searchDate, searchDate.AddDate(0, 0, 1)).
		Count(&available)

	return c.JSON(http.StatusOK, map[string]interface{}{
		"available": available,
		"events":    events,
	})
}

func GetEventsByTitle(c echo.Context) error {
	type GetEventsByTitleDto struct {
		Amount  int    `query:"amount" validate:"required,gte=1"`
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
	db.DB.Order("date ASC").
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
