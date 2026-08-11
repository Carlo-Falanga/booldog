import { Link } from "react-router-dom";
import WishListButton from "./WishListButton";
import { useCart } from "../context/useCart";
import { getProductImageUrl } from "../lib/api";
import { formatPrice } from "../lib/price";

export default function ProductCardList({ product, animalType }) {

  const { cart, addToCart } = useCart();

  const cartItem = cart.find((cartProduct) => cartProduct.id === product.id);
  const productsInCart = cartItem ? cartItem.quantity : 0;

  return (

    <div className="product-card border rounded-3 overflow-hidden">
      <div className="d-flex flex-wrap">

        <div className="col-12 col-md-3 position-relative">
          <WishListButton product={product} slug={product.slug} />
          <Link to={`/product/${product.slug}`} className="aspect-ratio-1x1 d-flex align-items-center justify-content-center">
            <img className="w-100 h-100 object-fit-contain p-3" src={getProductImageUrl(product.img_url)} alt={`${product.name}'s picture`} />
          </Link>
        </div>

        <div className="col-12 col-md-9 p-3 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="cart-meta mb-2">{animalType ? '' : `${product.animal_name} / `}{product.category}</div>
            <h3 className="cart-name h4 mb-2">{product.name}</h3>
            <div className="cart-name h5">{formatPrice(product.price)}</div>
            {product.stock === 0 ?
              <div className="soldout-btn">Esaurito</div>
              :
              <button
                onClick={() => addToCart(product, 1)}
                disabled={product.stock === 0}
                className="btn bg-black p-2 border-0 rounded-pill text-white">

                <i className="p-1 bi bi-cart2"></i>
                <span className=" mx-2">Aggiungi al carrello</span>

              </button>
            }
            {
              productsInCart > 0
              &&
              <em className=" mt-1 already-present d-block">{productsInCart} già nel carrello.</em>
            }
          </div>
        </div>

      </div>
    </div >
  );
}
