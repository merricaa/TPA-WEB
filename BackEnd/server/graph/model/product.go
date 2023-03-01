package model

type Product struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Image       string `json:"image"`
	Price       int    `json:"price"`
	Stock       int    `json:"stock"`
	Description string `json:"description"`
}

type ProductImage struct {
	ID        string   `json:"id"`
	Image     string   `json:"image"`
	ProductID string   `json:"productID" gorm:"size:191"`
	Product   *Product `json:"product"`
}
