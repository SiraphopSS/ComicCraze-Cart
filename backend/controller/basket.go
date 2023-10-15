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
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", basket.ComicID).First(&comic); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "comic not found"})
		return
	}

	b := entity.Basket{
		Member: member,
		Comic:  comic,
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

	if err := entity.DB().Preload("Member", "Comic").Raw("SELECT * FROM baskets WHERE member_id = ?", id).Scan(&basket).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": basket})

}

// GET /baskets

func ListBaskets(c *gin.Context) {

	var baskets []entity.Basket

	if err := entity.DB().Raw("SELECT * FROM baskets").Scan(&baskets).Error; err != nil {
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

func DeleteFromBasket(c *gin.Context) {
	id := c.Param("id")
	cid := c.Param("cid")

	if tx := entity.DB().Exec("DELETE FROM baskets WHERE member_id = ? and comic_id = ?", id, cid); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "comics not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
