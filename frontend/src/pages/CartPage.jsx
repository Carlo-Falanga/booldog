import { useEffect } from "react";
import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";
import CartProductsList from "../components/CartProductsList";
import CartTotal from "../components/CartTotal";
import { formatPrice } from "../lib/price";

export default function CartPage() {
  const { cart, setCart, total, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const saved = localStorage.getItem("cart_data");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, [setCart]);

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="cart-hero mt-3 mb-5">
          <span className="d-block">Il tuo</span>
          <em className="d-block">Carrello.</em>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <h2 className="mb-4">Il tuo carrello è vuoto</h2>
            <p className="text-muted mb-4">
              Sembra che tu non abbia ancora aggiunto articoli al tuo carrello.
            </p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-lg-2 g-5 ">
            <div className="col">
              <Link to="/products">
                <button className="btn btn-dark rounded-pill border-0 btn_cart mb-5 px-4 py-2">
                  <i className="bi bi-arrow-left-short pe-2"></i>
                  Continua a comprare
                </button>
              </Link>

              <CartProductsList
                total={total}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            </div>
            <div className="col">
              <section className="p-4 p-md-5 rounded-3 border bg-paper">
                <div className="d-flex align-items-baseline gap-3 pb-3 border-bottom mb-4">
                  <h2 className="mb-0">Riepilogo</h2>
                </div>

                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between mb-2">
                    <span>
                      Subtotale ({cart.reduce((s, i) => s + i.quantity, 0)}{" "}
                      articoli)
                    </span>
                    <span>{formatPrice(total)}</span>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>Spedizione in tutta Europa</span>
                    <span className="cart-meta text-success">Gratuita</span>
                  </li>
                </ul>

                <CartTotal />

                <p className="cart-meta mb-4 mt-1">
                  IVA inclusa ·Spedizione Gratuita
                </p>

                <Link
                  to="/checkout"
                  className="btn btn-dark btn-lg w-100 rounded-pill py-3 mb-4 d-flex align-items-center justify-content-center gap-2 border-0 btn_cart"
                >
                  <span className="fs-6">Vai al checkout</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>

                <ul className="list-unstyled mb-0">
                  <li className="d-flex gap-3 mb-3">
                    <i className="bi bi-envelope fs-5 text-dark"></i>
                    <div>
                      <div className="fw-medium">Mail di conferma</div>
                      <div className="small text-muted">
                        Riceverai una mail di conferma con i dettagli del tuo
                        ordine
                      </div>
                    </div>
                  </li>
                  <li className="d-flex gap-3 mb-3">
                    <i className="bi bi-box-seam fs-5 text-dark"></i>
                    <div>
                      <div className="fw-medium">
                        Spedito da Boolean Best Team
                      </div>
                      <div className="small text-muted">
                        Corriere espresso · consegna 24/48h
                      </div>
                    </div>
                  </li>
                  <li className="d-flex gap-3">
                    <i className="bi bi-arrow-counterclockwise fs-5 text-dark"></i>
                    <div>
                      <div className="fw-medium">30 giorni per ripensarci</div>
                      <div className="small text-muted">
                        Resi gratuiti, ritiro a domicilio incluso
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
