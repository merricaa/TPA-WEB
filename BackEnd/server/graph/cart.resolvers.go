package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.24

import (
	"context"
	"fmt"

	"github.com/jxsr12/oldegg/config"
	"github.com/jxsr12/oldegg/graph/model"
	"github.com/jxsr12/oldegg/service"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// User is the resolver for the user field.
func (r *cartResolver) User(ctx context.Context, obj *model.Cart) (*model.User, error) {
	user := new(model.User)
	var db = config.GetDB()

	return user, db.First(user, "id = ? ", obj.UserID).Error
}

// Product is the resolver for the product field.
func (r *cartResolver) Product(ctx context.Context, obj *model.Cart) (*model.Product, error) {
	var db = config.GetDB()
	product := new(model.Product)

	return product, db.Where("id = ?", obj.ProductID).Limit(1).Find(&product).Error
}

// CreateCart is the resolver for the createCart field.
func (r *mutationResolver) CreateCart(ctx context.Context, productID string, quantity int, notes string) (*model.Cart, error) {
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: fmt.Sprintf("%+v\n", ctx),
		}
	}
	userID := ctx.Value("auth").(*service.JwtCustomClaim).ID

	cart, _ := service.CartGetByUserProduct(ctx, userID, productID)

	if cart != nil {
		cart.Quantity += quantity
		cart.Notes = notes

		return cart, r.DB.Save(cart).Error
	}
	return service.CartCreate(ctx, userID, productID, quantity, notes)
}

// UpdateCart is the resolver for the updateCart field.
func (r *mutationResolver) UpdateCart(ctx context.Context, productID string, quantity int, notes string) (*model.Cart, error) {
	var db = config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "Error, token gaada",
		}
	}

	userID := ctx.Value("auth").(*service.JwtCustomClaim).ID

	cart, _ := service.CartGetByUserProduct(ctx, userID, productID)

	if cart == nil {
		return nil, &gqlerror.Error{
			Message: "Error, cart gaada",
		}
	}
	if quantity > 0 {
		cart.Quantity = quantity
		// cart.Notes = notes

		return cart, db.Save(cart).Error
	}
	return cart, db.Delete(cart).Error
}

// DeleteCart is the resolver for the deleteCart field.
func (r *mutationResolver) DeleteCart(ctx context.Context, productID string) (bool, error) {
	if ctx.Value("auth") == nil {
		return false, &gqlerror.Error{
			Message: "Error, token gaada",
		}
	}
	var db = config.GetDB()

	userID := ctx.Value("auth").(*service.JwtCustomClaim).ID

	model := new(model.Cart)
	if err := db.First(model, "user_id = ? AND product_id = ?", userID, productID).Error; err != nil {
		return false, err
	}

	return true, db.Delete(model).Error
}

// CreateWishlist is the resolver for the createWishlist field.
func (r *mutationResolver) CreateWishlist(ctx context.Context, productID string) (*model.Wishlist, error) {
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "Error, token gaada",
		}
	}
	var db = config.GetDB()

	userID := ctx.Value("auth").(*service.JwtCustomClaim).ID

	wishlist := new(model.Wishlist)

	if err := r.DB.First(wishlist, "user_id = ? AND product_id = ?", userID, productID); err == nil {
		return nil, &gqlerror.Error{
			Message: "Error, wishlist udah ada",
		}
	}

	wishlist = &model.Wishlist{
		UserID:    userID,
		ProductID: productID,
	}

	return wishlist, db.Create(wishlist).Error
}

// DeleteWishlist is the resolver for the deleteWishlist field.
func (r *mutationResolver) DeleteWishlist(ctx context.Context, productID string) (bool, error) {
	if ctx.Value("auth") == nil {
		return false, &gqlerror.Error{
			Message: "Error, token gaada",
		}
	}
	var db = config.GetDB()

	userID := ctx.Value("auth").(*service.JwtCustomClaim).ID

	model := new(model.Wishlist)
	if err := db.First(model, "user_id = ? AND product_id = ?", userID, productID).Error; err != nil {
		return false, err
	}

	return true, r.DB.Delete(model).Error
}

// Cart is the resolver for the cart field.
func (r *queryResolver) Cart(ctx context.Context, productID string) (*model.Cart, error) {
	panic(fmt.Errorf("not implemented: Cart - cart"))
}

// Carts is the resolver for the carts field.
func (r *queryResolver) Carts(ctx context.Context) ([]*model.Cart, error) {
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "Error, token gaada",
		}
	}

	id := ctx.Value("auth").(*service.JwtCustomClaim).ID
	var db = config.GetDB()
	var models []*model.Cart
	return models, db.Where("user_id = ?", id).Find(&models).Error
}

// Wishlists is the resolver for the wishlists field.
func (r *queryResolver) Wishlists(ctx context.Context) ([]*model.Wishlist, error) {
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "Error, token gaada",
		}
	}

	id := ctx.Value("auth").(*service.JwtCustomClaim).ID

	var models []*model.Wishlist
	return models, r.DB.Where("user_id = ?", id).Find(&models).Error
}

// User is the resolver for the user field.
func (r *wishlistResolver) User(ctx context.Context, obj *model.Wishlist) (*model.User, error) {
	var db = config.GetDB()
	user := new(model.User)

	return user, db.First(user, "id = ?", obj.UserID).Error
}

// Product is the resolver for the product field.
func (r *wishlistResolver) Product(ctx context.Context, obj *model.Wishlist) (*model.Product, error) {
	product := new(model.Product)
	var db = config.GetDB()
	return product, db.First(product, "id = ?", obj.ProductID).Error
}

// Cart returns CartResolver implementation.
func (r *Resolver) Cart() CartResolver { return &cartResolver{r} }

// Wishlist returns WishlistResolver implementation.
func (r *Resolver) Wishlist() WishlistResolver { return &wishlistResolver{r} }

type cartResolver struct{ *Resolver }
type wishlistResolver struct{ *Resolver }
