import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/useCart";
import ProductCard from "../components/ProductCard";
import WishListButton from "../components/WishListButton";
import { API_BASE_URL, getProductImageUrl } from "../lib/api";
import { formatPrice } from "../lib/price";

export default function ProductPage() {
  const { cart, addToCart } = useCart();

  const [dataProduct, setDataProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  const { slug } = useParams();

  const [previousSlug, setPreviousSlug] = useState(slug);
  if (slug !== previousSlug) {
    setPreviousSlug(slug);
    setProductQuantity(1);
  }

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/${slug}`)
      .then((res) => setDataProduct(res.data));
  }, [slug]);

  const existingInCart = cart.find((p) => p.id === dataProduct?.id);
  const quantityInCart = existingInCart ? existingInCart.quantity : 0;

  const stock = dataProduct?.stock ?? 0;
  const remainingStock = stock - quantityInCart;

  const isPlusDisabled = productQuantity >= remainingStock;
  const isAddDisabled = remainingStock <= 0;

  const increaseQuantity = () => {
    if (productQuantity < remainingStock) {
      setProductQuantity(productQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(dataProduct, productQuantity);
    setProductQuantity(1);
  };

  return (
    <section>
      <div className="container-lg py-3">
        {dataProduct && (
          <div>
            <div className="row">
              <div className="col-10 col-md-5 col-lg-6 offset-1 offset-md-0">
                <div className="ratio ratio-1x1">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      className="w-100 h-100 object-fit-contain"
                      src={getProductImageUrl(dataProduct.img_url)}
                      alt={dataProduct.name}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-7 col-lg-6 d-flex align-items-center justify-content-center">
                <div className="px-lg-5">
                  <div className="cart-meta mb-3">
                    {dataProduct.animal_name} / {dataProduct.category}
                  </div>
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <h1 className="display-3 lh-1 fw-normal">
                      {dataProduct.name}
                    </h1>
                    <WishListButton product={dataProduct} slug={slug} />
                  </div>
                  <p>{dataProduct.description}</p>
                  <div className="cart-meta mb-4">
                    <div className="mb-1">Marca <span className="text-black">{dataProduct.brand_name}</span></div>
                    <div className="mb-1">Taglia <span className="text-black">{dataProduct.size}</span></div>
                    <div className="mb-1">Colore <span className="text-black">{dataProduct.color}</span></div>
                    <div className="mb-1">Materiale <span className="text-black">{dataProduct.material}</span></div>
                  </div>
                  <div className="border-top py-4">
                    <p className="h1 mb-0 lh-1">{formatPrice(dataProduct.price)}</p>
                  </div>
                  <div className="border-top py-4">
                    {dataProduct.stock === 0 ? (
                      <p className="cart-meta mb-0 esaurito_product">Esaurito</p>
                    ) : (
                      <p className="cart-meta mb-0">
                        {dataProduct.stock === 1
                          ? "1 prodotto disponibile"
                          : `${dataProduct.stock} prodotti disponibili`}
                      </p>
                    )}
                  </div>


                  <div className="row gx-2">
                    <div className="col-auto">
                      <div className="quantity-controls rounded-pill bg-paper border d-flex">
                        <button
                          onClick={decreaseQuantity}
                          type="button"
                          disabled={productQuantity <= 1}
                          className="btn p-3 border-0"
                        >
                          <i className="bi bi-dash d-flex"></i>
                        </button>
                        <div className="d-flex align-items-center justify-content-center">
                          <span className="small">{productQuantity}</span>
                        </div>
                        <button
                          onClick={increaseQuantity}
                          type="button"
                          disabled={isPlusDisabled}
                          className="btn p-3 border-0"
                        >
                          <i className="bi bi-plus d-flex"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col">
                      <button
                        onClick={handleAddToCart}
                        disabled={isAddDisabled}
                        className="btn btn-dark w-100 p-3 lh-1 rounded-pill border-0"
                      >
                        {
                          stock === 0
                            ? "Esaurito"
                            : remainingStock <= 0
                              ? "Hai aggiunto tutti i prodotti disponibili"
                              : "Aggiungi al carrello"
                        }

                      </button>
                    </div>
                    {productQuantity && cart.length > 0 && (
                      <span className=" mt-1 already-present d-block">
                        {quantityInCart} articolo/i nel tuo carrello.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-5">
              <h3>Prodotti correlati</h3>
              <div className="row g-2 g-lg-3 g-xl-4">
                {dataProduct.related.map((product) => (
                  <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={product.slug}>
                    <ProductCard
                      product={product}
                      addToCart={() => addToCart(product, 1)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
