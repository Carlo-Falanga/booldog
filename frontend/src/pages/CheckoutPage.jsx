import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/useCart";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../lib/api";
import { formatPrice, splitPrice } from "../lib/price";

export default function CheckoutPage() {
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(null); // null | "valid" | "invalid"
  const [couponMessage, setCouponMessage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [, setAppliedCouponId] = useState(null);
  const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);
  const [couponName, setCouponName] = useState(null);
  const { cart, setCart } = useCart();
  const [orderMessage, setOrderMessage] = useState(null);
  const [serverError, setServerError] = useState("");
  const [newOrder, setNewOrder] = useState({
    user_full_name: "",
    email: "",
    phone_number: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
    products: [
      cart.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
        };
      }),
    ],
  });

  const quantityTot = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );
  const total = Math.max(0, subtotal - discount);

  function handleChange(e) {
    const { id, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [id]: value }));
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setServerError("");

    const orderToSend = {
      ...newOrder,
      products: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      coupon_code: couponStatus === "valid" ? couponCode.trim() : undefined,
    };

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/orders`,
        orderToSend,
      );
      console.log(data);
      setOrderMessage(true);

      setTimeout(() => {
        navigate(`/order-confirmed/${data.order_id}`);
        setCart([]);
      }, 1500);
    } catch (error) {
      const data = error.response?.data;

      if (Array.isArray(data?.errors)) {
        const messages = data.errors.map((err) => err.msg).join(" · ");
        setServerError(messages);
      } else if (data?.error) {
        setServerError(data.error);
      } else {
        setServerError("Errore durante l'invio dell'ordine");
      }

      setOrderMessage(false);
    }
  }

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    console.log(couponCode);
    if (!couponCode.trim()) return;

    setIsLoadingCoupon(true);
    setCouponStatus(null);
    setCouponMessage("");
    setDiscount(0);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/coupons`, {
        code: couponCode.trim(),
        products: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      if (data.valid) {
        setDiscount(data.discount);
        setAppliedCouponId(data.coupon?.id ?? null);
        setCouponStatus("valid");
        setCouponMessage(`Coupon applicato! Sconto di ${formatPrice(data.discount)}`);
        setCouponName(data.coupon);

        console.log(data);
      } else {
        setDiscount(0);
        setCouponStatus("invalid");
        setCouponMessage(data.message || "Coupon non valido");
      }
    } catch (err) {
      setDiscount(0);
      setCouponStatus("invalid");
      setCouponMessage(
        err.response?.data?.message || "Errore nella verifica del coupon",
      );
    } finally {
      setIsLoadingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponStatus(null);
    setCouponMessage("");
    setDiscount(0);
    setAppliedCouponId(null);
    setCouponName(null);
  };

  return (
    <>
      <div className="container my-4 ">
        <div className="d-flex justify-content-start ">
          <Link to="/cart">
            <button className="btn btn-dark rounded-pill border-0 btn_cart px-4 py-2">
              <i className="bi bi-arrow-left-short"></i>Modifica Carrello
            </button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container ">
          <div className="row row-cols-1 row-cols-md-2">
            <div className="col">
              {/* CONTACT */}
              <div className="d-flex flex-column justify-content-between d-lg-flex flex-lg-row ">
                <div className="d-flex gap-2 align-items-end ">
                  <p className="cart-meta">01</p>
                  <h3>Contatto</h3>
                </div>
                <div className="d-flex align-items-end cart-meta">
                  <p>Email · telefono</p>
                </div>
              </div>
              <hr />
              <div className="d-flex flex-column gap-4">
                <div className="">
                  <label htmlFor="inputEmail4" className="form-label cart-meta">
                    Email <span className="required-star">*</span>
                  </label>
                  <input
                    value={newOrder.email}
                    id="email"
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    placeholder="email@email.it"
                    required
                  />
                </div>
                <div className="">
                  <label htmlFor="inputTel" className="form-label cart-meta">
                    Numero di telefono <span className="required-star">*</span>
                  </label>
                  <input
                    value={newOrder.phone_number}
                    id="phone_number"
                    onChange={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9+]/g, "")
                        .replace(/(.)\+/g, "$1")
                        .slice(0, 15);
                      handleChange(e);
                    }}
                    type="text"
                    inputMode="numeric"
                    className="form-control"
                    placeholder="3334568752"
                    maxLength="15"
                    minLength="11"
                    required
                  />
                </div>
              </div>

              {/* SHIPPING */}
              <div className="mt-5">
                <div className="d-flex gap-2 align-items-end ">
                  <p className="cart-meta">02</p>
                  <h3>Indirizzo di spedizione</h3>
                </div>
              </div>
              <hr />
              <div className="d-flex flex-column gap-4">
                <div className="">
                  <label
                    htmlFor="inputFullName"
                    className="form-label cart-meta"
                  >
                    Nome e Cognome <span className="required-star">*</span>
                  </label>
                  <input
                    value={newOrder.user_full_name}
                    id="user_full_name"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Mario Rossi"
                    required
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="inputAddress"
                    className="form-label cart-meta"
                  >
                    Indirizzo <span className="required-star">*</span>
                  </label>
                  <input
                    value={newOrder.address}
                    id="address"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Via Roma 1"
                    required
                  />
                </div>
                <div className="d-flex gap-2 mb-3">
                  <div className="">
                    <label htmlFor="inputCity" className="form-label cart-meta">
                      Città <span className="required-star">*</span>
                    </label>
                    <input
                      value={newOrder.city}
                      id="city"
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Roma"
                      required
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="inputState"
                      className="form-label cart-meta"
                    >
                      Paese <span className="required-star">*</span>
                    </label>
                    <input
                      value={newOrder.country}
                      id="country"
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Italia"
                      required
                    />
                  </div>
                  <div className="">
                    <label htmlFor="inputZip" className="form-label cart-meta">
                      Cap <span className="required-star">*</span>
                    </label>
                    <input
                      value={newOrder.zipcode}
                      id="zipcode"
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^0-9-]/g, "")
                          .slice(0, 10);
                        handleChange(e);
                      }}
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      placeholder="00100"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card p-4 p-md-5 rounded-3 border bg-paper">
                <div className="d-flex flex-column justify-content-between d-lg-flex flex-lg-row">
                  <div className="d-flex gap-2 align-items-end mt-4">
                    <p className="cart-meta">03</p>
                    <h3>Il tuo ordine</h3>
                  </div>
                  <div className="d-flex align-items-end cart-meta">
                    <p>{quantityTot} - PEZZI</p>
                  </div>
                </div>
                <hr />

                <div className="d-flex flex-column gap-3">
                  {cart.map((item) => (
                    <div
                      key={item.slug}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex flex-column">
                        <span className="cart-meta">{item.brand_name}</span>
                        <span className="order_product_font fw-medium pe-1">
                          {item.name} <i className="bi bi-x"></i>
                          {item.quantity}
                        </span>
                      </div>
                      <span className="order_product_font fw-medium">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
                {/* COUPON */}
                <div className="d-flex flex-column justify-content-center mt-4 mb-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${couponStatus === "valid" ? "is-valid" : couponStatus === "invalid" ? "is-invalid" : ""} rounded-start-pill p-3`}
                      id="inputCoupon"
                      maxLength="20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponStatus === "valid"}
                      placeholder="Codice coupon"
                    />
                    {couponStatus === "valid" ? (
                      <button
                        className="btn btn-outline-danger rounded-end-pill"
                        onClick={handleRemoveCoupon}
                        type="button"
                      >
                        Rimuovi
                      </button>
                    ) : (
                      <button
                        className="btn rounded-end-pill btn-dark "
                        onClick={handleApplyCoupon}
                        type="button"
                        disabled={isLoadingCoupon || !couponCode.trim()}
                      >
                        {isLoadingCoupon ? (
                          <span className="spinner-border spinner-border-sm" />
                        ) : (
                          "Applica"
                        )}
                      </button>
                    )}
                  </div>

                  {couponMessage && (
                    <div
                      className={`mt-2  ${couponStatus === "valid" ? "text-success" : "text-danger"} d-flex justify-content-center`}
                    >
                      {couponMessage}
                    </div>
                  )}

                </div>

                <hr />

                <div className="d-flex flex-column gap-3 checkout_subtotal_font">
                  <div className="d-flex justify-content-between">
                    <span>Subtotale</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {couponStatus === "valid" && (
                    <div className="d-flex justify-content-between">
                      <span>
                        Coupon{" "}
                        <span className="text-success fw-bold">
                          {couponName.code}
                        </span>
                      </span>
                      <span className="text-danger fw-bold">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Spedizione in tutta Europa</span>
                    <span className="cart-meta text-success">Gratuita</span>
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="cart-name">Totale</h3>
                  <span className="cart-name cart_total">
                    € {splitPrice(total).euros}
                    <span className="ms-1 cart_cents">
                      ,{splitPrice(total).cents}
                    </span>
                  </span>
                </div>
                <span className="cart-meta">
                  EUR · IVA inclusa · senza costi nascosti
                </span>
                <div className="d-flex justify-content-center  mt-4 mb-3">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg w-100 rounded-pill py-3 mb-4 d-flex align-items-center justify-content-center gap-2 border-0 btn_cart"
                  >
                    <span className="fs-6">paga {formatPrice(total)}</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>

                {orderMessage === true && (
                  <div className="text-success">
                    ordine effettuato a breve verrai reindirizzato nella pagina
                    di conferma!
                  </div>
                )}
                 {serverError && (
                  <h4 className="text-danger d-flex justify-content-center mb-4">
                    {serverError}
                  </h4>
                )}

                <hr />

                <ul className="list-unstyled mb-0">
                  <li className="d-flex gap-3 mb-3">
                    <i className="bi bi-hand-thumbs-up"></i>
                    <div>
                      <div className="fw-medium">Pagamento protetto</div>
                      <div className="small text-muted">
                        SSL 256-bit · 3-D Secure su ogni carta
                      </div>
                    </div>
                  </li>
                  <li className="d-flex gap-3 mb-3">
                    <i className="bi bi-box-seam fs-5 text-dark"></i>
                    <div>
                      <div className="fw-medium">
                        Spedizione tracciata
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
