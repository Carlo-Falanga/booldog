import {
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useCart } from "../context/useCart";
import { useUi } from "../context/useUi";
import booldog_logo from "../assets/logo/Booldog_logo.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const { setAsideCart, setAsideNav } = useUi();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchQuery);

  // the url can change from outside the field, with a link or the back button
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    if (search.trim() === "") return;

    const newParams = new URLSearchParams(searchParams);

    newParams.set("search", search);

    let targetPath = location.pathname;
    if (targetPath !== "/products/animal/cane" && targetPath !== "/products/animal/gatto" && targetPath !== "/products") {
      targetPath = "/products";
    }

    navigate(`${targetPath}?${newParams.toString()}`);
  }

  return (
    <>
      <nav className="nav-main sticky-lg-top top-0 z-2 px-lg-3 px-xl-5 py-3 d-flex flex-wrap align-items-center justify-content-end">

        <div className="d-block d-lg-none col-4">
          <button onClick={() => setAsideNav(true)} className="btn btn-hamburger border-0 p-3">
            <i className="d-flex bi bi-list"></i>
          </button>
        </div>

        <div className="aside-nav px-3 py-3 p-lg-0 z-3 col-lg-5">
          <div className="d-block d-lg-none">
            <button onClick={() => setAsideNav(false)} className="d-block ms-auto mb-3 btn border-0 p-2">
              <i className="d-flex bi bi-x-lg"></i>
            </button>
          </div>
          <ul className="d-flex flex-wrap list-unstyled mb-0">
            <li className="col-12 col-lg-auto p-2 p-xl-3">
              <NavLink to="/" className="text-decoration-none d-flex align-items-center justify-content-between">
                <span>Home</span>
                <i className="d-flex d-lg-none bi bi-chevron-right"></i>
              </NavLink>
            </li>
            <li className="col-12 col-lg-auto p-2 p-xl-3">
              <NavLink to="/products/animal/cane" className="text-decoration-none d-flex align-items-center justify-content-between">
                <span>Cane</span>
                <i className="d-flex d-lg-none bi bi-chevron-right"></i>
              </NavLink>
            </li>
            <li className="col-12 col-lg-auto p-2 p-xl-3">
              <NavLink to="/products/animal/gatto" className="text-decoration-none d-flex align-items-center justify-content-between">
                <span>Gatto</span>
                <i className="d-flex d-lg-none bi bi-chevron-right"></i>
              </NavLink>
            </li>
            <li className="col-12 col-lg-auto p-2 p-xl-3">
              <NavLink to="/products" className="text-decoration-none d-flex align-items-center justify-content-between" end>
                <span>Catalogo</span>
                <i className="d-flex d-lg-none bi bi-chevron-right"></i>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-logo col-4 col-lg-2">
          <Link to="/" className="d-flex justify-content-center">
            <img className="img_no_hover" src={booldog_logo} alt="Booldog Logo" />
          </Link>
        </div>

        <div className="col-4 col-lg-2">
          <div className="row g-0 align-items-center justify-content-end">
            <div className="col-auto p-3">
              <button onClick={() => setAsideCart(true)} className="border-0 p-0 bg-transparent position-relative cursor-pointer">
                <i className="bi bi-cart2 d-flex"></i>
                <span className="cart_badge position-absolute top-0 start-100 translate-middle rounded-circle d-block aspect-ratio-1x1 text-white text-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </button>
            </div>
            <div className="col-auto p-3">
              <Link to="/wishlist" className="text-decoration-none">
                <i className="bi bi-heart d-flex"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3 p-3">
          <form onSubmit={handleSubmit} className="d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2 rounded-pill border-0 col"
              placeholder="Marche, prodotti, animali..."
              aria-label="Cerca fra marche, prodotti e animali"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="col-auto">
              <button className="btn btn-dark border-0 p-2 rounded-circle aspect-ratio-1x1">
                <i className="d-flex bi bi-search text-white"></i>
              </button>
            </div>
          </form>
        </div>

      </nav>

    </>
  );
}
