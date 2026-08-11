import { Link } from "react-router-dom";
import { useUi } from "../context/useUi";
import CartProductsList from "./CartProductsList";
import CartTotal from "./CartTotal";

export default function SideCart() {

  const { setAsideCart } = useUi();

  return (
    <>
      <div>
        <aside className="aside-cart position-fixed top-0 h-100 bg-white shadow-lg p-3 z-3 sidebar_width overflow-scroll">
          <div className="mb-5">

            <button
              className="btn-close d-flex ms-auto mb-3"
              aria-label="Close"
              onClick={() => setAsideCart(false)}
            ></button>

            <CartProductsList />

            <CartTotal />

            <div className="d-flex justify-content-end text-decoration-none">
              <Link to="/cart" className="btn btn-dark btn-sm rounded-pill w-50 py-3 mt-4 border-0 btn_cart">
                Vai al carrello
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
