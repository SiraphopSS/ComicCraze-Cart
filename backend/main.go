package main

import (
	"github.com/gin-gonic/gin"

	"github.com/SiraphopSS/SA-66-Comic_Craze_Shop-main/controller"

	"github.com/SiraphopSS/SA-66-Comic_Craze_Shop-main/entity"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	// Member
	r.GET("/members", controller.ListUsers)
	r.GET("/members/:id", controller.GetMembers)
	r.POST("/members", controller.CreateMembers)
	r.PATCH("/members", controller.UpdateMembers)
	r.DELETE("/members/:id", controller.DeleteMembers)

	// Comic
	r.GET("/comics", controller.ListComics)
	r.GET("/comics/:id", controller.GetComics)
	r.POST("/comics", controller.CreateComics)

	// Basket
	r.GET("/baskets", controller.ListBaskets)
	r.GET("/baskets/:id", controller.GetBaskets)
	r.POST("/baskets", controller.CreateBaskets)
	r.PATCH("/baskets", controller.UpdateBasket)
	r.DELETE("/baskets/:id", controller.DeleteBaskets)
	// ============
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
