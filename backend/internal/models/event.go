package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Event struct {
	gorm.Model
	ID          uuid.UUID `gorm:"primaryKey, type:uuid"`
	Title       string
	Description string
	Date        time.Time
	Category    string
	Rating      uint8
	Location    string
	Image       string
	OnEdit      bool
}
