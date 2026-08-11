import { useCart } from "../context/useCart";

export default function CartTotal() {
  const { total } = useCart();
  return (
    <div className="d-flex justify-content-between align-items-baseline pt-3 border-top">
      <h3 className="cart-name mb-0">Totale</h3>
      <span className="cart-name cart_total">
        € {total.toFixed(2).split(".")[0]}
        <span className=" ms-1 cart_cents">
          ,{total.toFixed(2).split(".")[1]}
        </span>
      </span>
    </div>
  );
}
