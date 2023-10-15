package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model
	Email    string
	Username string
	Password string

	Baskets []Basket `gorm:"foreignKey:MemberID"`
}
