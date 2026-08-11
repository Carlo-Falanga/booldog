import { useWishlist } from "../context/useWishlist";

export default function WishListButton({ product, slug }) {

    const {
        addToWishList,
        isInWishList
    } = useWishlist();

    const addedToWishList = isInWishList(slug)

    return (
        <button
            onClick={() => addToWishList(product)}
            className="btn p-2 bg-white position-absolute top-0 end-0 z-1 m-2 rounded-circle aspect-ratio-1x1 border d-flex align-items-center justify-content-center cursor-pointer"
        >
            <i
                className={`d-flex p-1 bi ${addedToWishList ? "bi-heart-fill" : "bi-heart"}`}
            ></i>
        </button>
    )
}