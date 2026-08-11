import { Link } from "react-router-dom";
import WishListButton from "./WishListButton";
import { useCart } from "../context/useCart";
import { getProductImageUrl } from "../lib/api";
import { formatPrice } from "../lib/price";

export default function ProductCard({ product, animalType }) {

  const { cart, addToCart } = useCart();

  const cartItem = cart.find((cartProduct) => cartProduct.id === product.id);
  const productsInCart = cartItem ? cartItem.quantity : 0;

  return (

    <div className="product-card border rounded-3 overflow-hidden h-100">
      <div className="d-flex flex-column h-100">

        <div className="col-auto position-relative">
          <WishListButton
            product={product}
            slug={product.slug}
            className="position-absolute top-0 end-0 z-1 m-2"
          />
          <Link to={`/product/${product.slug}`} className="aspect-ratio-1x1 d-flex align-items-center justify-content-center">
            <img className="w-100 h-100 object-fit-contain p-3" src={getProductImageUrl(product.img_url)} alt={`${product.name}'s picture`} />
          </Link>
        </div>

        <div className="col px-3">
          <div className="cart-meta mb-2">{animalType ? '' : `${product.animal_name} / `}{product.category}</div>
          <h3 className="cart-name h5 mb-3">{product.name}</h3>
        </div>

        <div className="px-3 col-auto">
          <div className="border-top py-3 d-flex align-items-center justify-content-between">
            <div className="font-newsreader h3 mb-0 lh-1 fw-light">
              {formatPrice(product.price)}
            </div>
            <div>
              {product.stock === 0 ?
                <div className="soldout-btn">Esaurito</div>
                :
                <button
                  onClick={() => (addToCart(product, 1))}
                  disabled={product.stock === 0}
                  className="btn bg-black p-2 border-0 rounded-pill text-white d-flex justify-content-between align-items-center">
                  {
                    productsInCart > 0
                    &&
                    <span className="already-present-num mx-2 align-self-center">{productsInCart}</span>
                  }
                  <i className="d-flex p-1 bi bi-cart2"></i>
                </button>
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
