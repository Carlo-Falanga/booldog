import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../lib/api";

export default function CartProductsList() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      <section className="cart-items">
        <div className="d-flex align-items-baseline justify-content-between pb-3 border-bottom mb-4">
          <div className="d-flex align-items-baseline gap-3">
            <h3 className="mb-0">Articoli</h3>
          </div>
          <span className="cart-meta">
            {cart.reduce((sum, i) => sum + i.quantity, 0)} · PEZZI
          </span>
        </div>

        {cart.length === 0 &&
          <div className="text-center py-5">
            <h2 className="mb-4">Il tuo carrello è vuoto</h2>
            <p className="text-muted mb-4">
              Sembra che tu non abbia ancora aggiunto articoli al tuo carrello.
            </p>
          </div>}

        <ul className="list-unstyled m-0">
          {cart.map((item) => {
            const hasStock = typeof item.stock === "number";
            const isPlusDisabled = hasStock && item.quantity >= item.stock;
            const isMinusDisabled = item.quantity <= 1;

            return (
              <li
                key={item.slug}
                className="d-flex flex-wrap gap-4__ py-4 border-bottom cart-item"
              >
                <div className="col-3 p-1">
                  <Link
                    to={`/product/${item.slug}`}
                    className="text-decoration-none text-reset aspect-ratio-1x1 d-flex align-items-center justify-content-center"
                  >
                    <img
                      src={getProductImageUrl(item.img_url)}
                      alt={item.name}
                      className="w-100 h-100 object-fit-contain"
                    />
                  </Link>
                </div>

                <div className="col-9 col-md-6 px-3">

                  <p className="small mb-3 cart-meta">
                    {item.size && (
                      <>
                        Taglia{" "}
                        <span className="text-black">{item.size} </span>
                      </>
                    )}
                    {item.color && (
                      <>
                        · Colore{" "}
                        <span className="text-black">{item.color}</span>
                      </>
                    )}
                  </p>

                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <div className="quantity-controls rounded-pill bg-paper border d-flex">
                      <button
                        type="button"
                        disabled={isMinusDisabled}
                        className="btn p-2 border-0"
                        onClick={() => updateQuantity(item.slug, -1)}
                      >
                        <i className="bi bi-dash d-flex"></i>
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="small">{item.quantity}</span>
                      </div>
                      <button
                        type="button"
                        disabled={isPlusDisabled}
                        className="btn p-2 border-0"
                        onClick={() => updateQuantity(item.slug, +1)}
                      >
                        <i className="bi bi-plus d-flex"></i>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-link btn-sm p-0 text-decoration-none remove_product_list"
                      onClick={() => removeFromCart(item.slug)}
                    >
                      Rimuovi
                    </button>
                  </div>
                  <div className="pt-3 d-block d-md-none">
                    <span className="cart-name fs-4">€ {item.price}</span>
                  </div>
                </div>

                <div className="col-3 text-end d-none d-md-block">
                  <span className="cart-name fs-4">€ {item.price}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section >
    </>
  );
}
