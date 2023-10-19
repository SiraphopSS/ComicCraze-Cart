package entity

import (
	"gorm.io/gorm"
)

type Comic struct {
	gorm.Model

	CategoryID int
	AdminID    int

	Image       string `gorm:"type:longtext"`
	Title       string
	Description string
	Url         string
	Price       float64

	Baskets []Basket `gorm:"foreignKey:ComicID"`
}
