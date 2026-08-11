import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UiContextProvider } from "./context/UiContext";
import { CartContextProvider } from "./context/CartContext";
import { WishListContextProvider } from "./context/WishListContext";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import WishListPage from "./pages/WishListPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <UiContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
                <Route path="product/:slug" element={<ProductPage />} />
                <Route path="/products" element={<SearchPage />} />
                <Route path="/products/animal/:animalSlug" element={<SearchPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishListPage />} />
                <Route path="/order-confirmed/:id" element={<OrderConfirmedPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </WishListContextProvider>
        </CartContextProvider>
      </UiContextProvider>
    </BrowserRouter>
  );
}

export default App;
