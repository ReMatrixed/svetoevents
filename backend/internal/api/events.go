package api

import (
	"net/http"
	"svetoevents/backend/internal/database"
	"svetoevents/backend/internal/models"
	"time"

	"github.com/labstack/echo/v4"
)

func EventGetUpcoming(c echo.Context) error {
	type GetUpcoming struct {
		Amount int `query:"amount" validate:"required,gte=1,lte=16"`
	}
	var params GetUpcoming
	if err := c.Bind(&params); err != nil {
		return err
	}
	if err := c.Validate(params); err != nil {
		return err
	}

	var events []models.Event
	database.DB.Order("date asc").Limit(params.Amount).Find(&events)
	return c.JSON(http.StatusOK, map[string]interface{}{
		"events": events,
	})
}

func EventSearchByDate(c echo.Context) error {
	type GetUpcoming struct {
		Amount  int    `query:"amount" validate:"required,gte=1,lte=16"`
		Request string `query:"date" validate:"required,omitempty"`
	}
	var params GetUpcoming
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
	database.DB.Order("date asc").Limit(params.Amount).Where("date BETWEEN ? AND ?", searchDate, searchDate.AddDate(0, 0, 1)).Find(&events)
	return c.JSON(http.StatusOK, map[string]interface{}{
		"events": events,
	})
}
