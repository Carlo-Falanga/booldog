import { useState, useEffect } from "react";
import { CartContext } from "./useCart";

const CART_STORAGE_KEY = "cart_data";

// older saved carts have no stock field, and that must not block the user
function availableStock(value) {
  return typeof value === "number" ? value : Infinity;
}

function readStoredCart() {
  const saved = localStorage.getItem(CART_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const addToCart = (item, quantity) => {
    const stock = availableStock(item.stock);

    if (stock <= 0) {
      return;
    }

    const productInCart = cart.find((product) => product.id === item.id);

    if (!productInCart) {
      setCart([...cart, { ...item, quantity: Math.min(quantity, stock) }]);
      return;
    }

    if (productInCart.quantity >= stock) {
      return;
    }

    setCart(
      cart.map((product) => {
        if (product.id !== item.id) return product;

        return {
          ...product,
          quantity: Math.min(product.quantity + quantity, stock),
        };
      }),
    );
  };

  const updateQuantity = (slug, amount) => {
    setCart(
      cart.map((item) => {
        if (item.slug !== slug) return item;

        const stock = availableStock(item.stock);
        const quantity = Math.max(1, Math.min(item.quantity + amount, stock));

        return { ...item, quantity };
      }),
    );
  };

  const removeFromCart = (slug) => {
    setCart(cart.filter((item) => item.slug !== slug));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
