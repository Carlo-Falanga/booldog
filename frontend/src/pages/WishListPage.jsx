import { useState } from "react";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import ProductCard from "../components/ProductCard";
import ProductCardList from "../components/ProductCardList";
import GridListButton from "../components/GridListButton";


export default function WishListPage() {

  const [listView, setListView] = useState(true)

  const { addToCart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="cart-hero mt-3 mb-5">
          <span className="d-block">La tua</span>
          <em className="d-block">Wishlist.</em>
        </h1>

        {wishlist.length != 0 &&
          <div className="d-flex align-items-center justify-content-between mb-3">

            <GridListButton setListView={setListView} />

          </div>
        }

        <div className="row g-2 g-lg-3 g-xl-4">
          {wishlist.map((product) => (
            listView ?
              (
                <div key={product.slug} className="col-12 col-sm-6 col-md-4 col-xl-3">
                  <ProductCard product={product} addToCart={() => addToCart(product, 1)} />
                </div>
              )
              :
              (
                <div key={product.slug} className="col-12">
                  <ProductCardList product={product} addToCart={() => addToCart(product, 1)} />
                </div>
              )
          ))}
        </div>

        {
          wishlist.length === 0 && (
            <div className="text-center py-5">
              <h2 className="mb-4">La tua Wishlist è vuota.</h2>
              <p className="text-muted mb-4">
                Non hai prodotti preferiti per il momento. Clicca sui cuori per
                aggiungerli qui!
              </p>
            </div>
          )
        }

      </div>
    </section >
  );
}
