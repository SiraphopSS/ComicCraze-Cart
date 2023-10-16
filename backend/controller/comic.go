package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/SiraphopSS/SA-66-Comic_Craze_Shop-main/entity"
)

// Post Comic
func CreateComics(c *gin.Context) {
	var comic entity.Comic

	if err := c.ShouldBindJSON(&comic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	co := entity.Comic{
		CategoryID:  comic.CategoryID,
		AdminID:     comic.AdminID,
		Image:       comic.Image,
		Title:       comic.Title,
		Description: comic.Description,
		Link:        comic.Link,
		Price:       comic.Price,
	}

	if err := entity.DB().Create(&co).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": co})
}

// get Comic/:id
func GetComics(c *gin.Context) {

	var comic entity.Comic

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM comics WHERE id = ?", id).Scan(&comic).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": comic})

}

func ListComics(c *gin.Context) {

	var comics []entity.Comic

	if err := entity.DB().Raw("SELECT * FROM comics").Scan(&comics).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comics})

}

// func ListBasketComics(c *gin.Context) {
// 	var comics []entity.Comic
// 	id := c.Param("id")

// 	if err := entity.DB().Raw("SELECT * FROM baskets WHERE id IN ?").Scan(&comics).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": comics})
// }
