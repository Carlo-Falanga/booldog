import { useCart } from "../context/useCart";
import { splitPrice } from "../lib/price";

export default function CartTotal() {
  const { total } = useCart();
  const { euros, cents } = splitPrice(total);

  return (
    <div className="d-flex justify-content-between align-items-baseline pt-3 border-top">
      <h3 className="cart-name mb-0">Totale</h3>
      <span className="cart-name cart_total">
        € {euros}
        <span className="ms-1 cart_cents">,{cents}</span>
      </span>
    </div>
  );
}
