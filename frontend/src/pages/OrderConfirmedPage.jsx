import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../lib/api";
import { formatPrice } from "../lib/price";

export default function OrderConfirmedPage() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/orders/${id}`, {
        params: { id: id },
      })
      .then(({ data }) => {
        setData(data);
      });
  }, [id]);

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="card rounded-4 p-4 bg-paper">
          <h1 className="cart-hero mt-3 mb-5">
            <span className="d-block">Ordine</span>
            <em className="d-block">Confermato.</em>
          </h1>

          <h2 className="cart-meta mb-3">Dati di fatturazione</h2>
          <ul className="list-unstyled">
            <li>
              <span className="fw-semibold">Cliente:</span>{" "}
              {data.user_full_name}
            </li>
            <li>
              <span className="fw-semibold">Email:</span> {data.email}
            </li>
            <li>
              <span className="fw-semibold">Telefono:</span> {data.phone_number}
            </li>
            <li>
              <span className="fw-semibold">Paese:</span> {data.country}
            </li>
            <li>
              <span className="fw-semibold">Indirizzo:</span> {data.address},{" "}
              {data.zipcode}, {data.city}
            </li>
          </ul>
          <hr />
          <h2 className="cart-meta mb-3">Dettagli dell'ordine</h2>
          <ul className="list-unstyled">
            <li>
              <span className="fw-semibold">Codice Ordine:</span>{" "}
              {data.order_code}
            </li>
            <li>
              <span className="fw-semibold">Data:</span>{" "}
              {new Date(data.created_at).toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
          </ul>
          <hr />
          <div className="table-responsive">
            <table className="order-table">
              <thead>
                <tr>
                  <th scope="col">Prodotto</th>
                  <th scope="col">Quantità</th>
                  <th scope="col">Prezzo</th>
                  <th scope="col">Subtotale</th>
                </tr>
              </thead>
              <tbody>
                {data.items?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(item.price)}</td>
                    <td>{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
                <tr className="order-total">
                  <td colSpan={3}>Totale</td>
                  <td>{formatPrice(data.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center align-items-center m-3">
            <Link
              to="/"
              className="btn btn-dark rounded-pill border-0 btn_cart px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-arrow-left-short"></i>
              Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
