package entity

import (
	"gorm.io/gorm"
)

type Comic struct {
	gorm.Model
	CategoryID  int
	AdminID     int
	Image       string
	Title       string
	Description string
	Link        string
	Price       float32

	Baskets []Basket `gorm:"foreignKey:ComicID"`
}
