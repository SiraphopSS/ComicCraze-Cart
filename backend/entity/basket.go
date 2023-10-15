package entity

import (
	"gorm.io/gorm"
)

type Basket struct {
	gorm.Model

	MemberID *uint
	Member   Member `gorm:"foreignKey:MemberID"`

	ComicID *uint
	Comic   Comic `gorm:"foreignKey:ComicID"`

	Total float32
}
