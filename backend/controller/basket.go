package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/SiraphopSS/SA-66-Comic_Craze_Shop-main/entity"
)

// Post Basket
func CreateBaskets(c *gin.Context) {

	var basket entity.Basket
	var member entity.Member
	var comic entity.Comic

	if err := c.ShouldBindJSON(&basket); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", basket.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"Create error": "member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", basket.ComicID).First(&comic); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"Create error": "comic not found"})
		return
	}

	b := entity.Basket{
		Member: member,
		Total:  basket.Total,
	}

	if err := entity.DB().Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": b})

}

// GET /user/:id

func GetBaskets(c *gin.Context) {

	var basket entity.Basket

	id := c.Param("id")

	if err := entity.DB().Preload("Member").Preload("Comic").Raw("SELECT * FROM baskets WHERE member_id = ?", id).Scan(&basket).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": basket})

}

// GET /baskets

func ListBaskets(c *gin.Context) {

	var baskets []entity.Basket

	if err := entity.DB().Preload("Member").Preload("Comic").Raw("SELECT * FROM baskets").Scan(&baskets).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": baskets})

}

// DELETE /baskets/:id

func DeleteBaskets(c *gin.Context) {

	id := c.Param("ID")

	if tx := entity.DB().Exec("DELETE FROM baskets WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "basket not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

func UpdateBasket(c *gin.Context) {
	var basket entity.Basket

	if err := c.ShouldBindJSON(&basket); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา review ด้วย id
	if tx := entity.DB().Where("id = ?", basket.ID).First(&basket); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "review not found"})
		return
	}

	if err := entity.DB().Save(&basket).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": basket})
}
