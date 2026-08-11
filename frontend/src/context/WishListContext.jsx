import { useState, useEffect } from "react";
import { WishListContext } from "./useWishlist";

export function WishListContextProvider({ children }) {

  const wishlistArr = [];

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wish_data");
    return saved ? JSON.parse(saved) : wishlistArr;
  });

  useEffect(() => {
    localStorage.setItem("wish_data", JSON.stringify(wishlist));
  }, [wishlist]);


  const isInWishList = (slug) => wishlist.find((item) => item.slug === slug);


  const addToWishList = (product) => {

    if (isInWishList(product.slug)) {
      const updatedWishList = wishlist.filter((item) => item.slug !== product.slug);
      setWishlist(updatedWishList);
    } else {
      setWishlist([...wishlist, { ...product }]);
    }
  };


  return (
    <WishListContext.Provider value={{
      wishlist,
      setWishlist,
      addToWishList,
      isInWishList
    }}>
      {children}
    </WishListContext.Provider>
  );

}
