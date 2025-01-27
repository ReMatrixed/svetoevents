package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Event struct {
	gorm.Model
	ID          uuid.UUID `json:"id" gorm:"primaryKey, type:uuid"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Date        time.Time `json:"date"`
	Category    string    `json:"category"`
	Rating      uint8     `json:"rating"`
	Location    string    `json:"location"`
	Image       string    `json:"image"`
	OnEdit      bool      `json:"on_edit"`
}
