import { useWishlist } from "../context/useWishlist";

export default function WishListButton({ product, slug, className = "" }) {
  const { addToWishList, isInWishList } = useWishlist();

  const addedToWishList = isInWishList(slug);

  return (
    <button
      onClick={() => addToWishList(product)}
      aria-label={
        addedToWishList ? "Togli dai preferiti" : "Aggiungi ai preferiti"
      }
      className={`btn p-2 bg-white rounded-circle aspect-ratio-1x1 border d-flex align-items-center justify-content-center cursor-pointer ${className}`}
    >
      <i
        className={`d-flex p-1 bi ${addedToWishList ? "bi-heart-fill" : "bi-heart"}`}
      ></i>
    </button>
  );
}
