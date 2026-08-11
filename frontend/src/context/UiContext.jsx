import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UiContext } from "./useUi";

export function UiContextProvider({ children }) {
  const location = useLocation();

  const [asideCart, setAsideCart] = useState(false);
  const [asideNav, setAsideNav] = useState(false);

  // a drawer left open would still be there on the next page
  useEffect(() => {
    setAsideCart(false);
    setAsideNav(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("aside-cart-open", asideCart);
    document.body.classList.toggle("aside-nav-open", asideNav);
    document.body.classList.toggle("overflow-hidden", asideCart || asideNav);
  }, [asideCart, asideNav]);

  return (
    <UiContext.Provider
      value={{ asideCart, asideNav, setAsideCart, setAsideNav }}
    >
      {children}
    </UiContext.Provider>
  );
}
