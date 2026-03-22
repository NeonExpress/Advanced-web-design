import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart} = useContext(CartContext);
    return (
        <div className="card h-100 shadow-sm">

            {/* Image wrapper for zoom and badge */}
            <div className="product-img-wrapper">

                {/* Sale badge */}
                {product.discount && (
                    <div className="sale-badge">
                        -{product.discount}%
                    </div>
                )}

                <img
                    src={product.image}
                    className="card-img-top product-img"
                    alt={product.name}
                />
            </div>

            <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.name}
                    {product.name || 'Unnamed product'}
                </h6>   

                {/* Star rating */}
                <div className="mb-2 text-warning">
                    {[...Array(5)].map((star, index) => (
                        <i
                            key={index}
                            className={`fa-star ${index < product.rating ? 'fas' : 'far'} fa`}
                        ></i>
                    ))}
                </div>

                {/* Price section */}
                <div className="mb-2">
                    <span className="text-muted text-decoration-line-through me-2">
                        {product.oldPrice}
                    </span>

                    <span className="fw-bold text-danger">
                        {product.price}
                    </span>
                </div>

                
                <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(product)}
                    >
                <i className="fas fa-shopping-cart me-2"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;