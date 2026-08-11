import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../lib/api";

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
          <h3 className="cart-hero mt-3 mb-5 d-flex flex-wrap justify-content-center">
            <span className="d-block">
              Ordine
            </span>
            <em className="d-block">Confermato!</em>
          </h3>

          <span className="fw-medium d-flex justify-content-center m-3">
            Dati di fatturazione
          </span>
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
          <span className="fw-medium d-flex justify-content-center m-3">
            Dettagli dell'ordine
          </span>
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
            <li>
              <span className="fw-semibold">Totale:</span> {data.total}€
            </li>
            <li>
              <span className="fw-semibold">Stato:</span> {data.status}
            </li>
          </ul>
          <hr />
          <span className="fw-medium d-flex justify-content-center m-3">
            Prodotti acquistati
          </span>
          <div className="table-responsive">
            <table className="table table-hover my-custom-table">
              <thead>
                <tr>
                  <th scope="col">Prodotto</th>
                  <th scope="col">Quantità</th>
                  <th scope="col">Prezzo</th>
                  <th scope="col">Subtotale</th>
                  <th scope="col">Totale</th>
                </tr>
              </thead>
              <tbody>
                {data.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}€</td>
                    <td>{(item.price * item.quantity).toFixed(2)}€</td>
                    <td></td>
                  </tr>
                ))}
                <tr className="table-dark">
                  <td className="fw-bold">Totale</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="fw-semibold">{data.total}€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center align-items-center m-3">
            <Link to="/">
              <button className="btn btn-dark rounded-pill border-0 btn_cart">
                <i className="bi bi-arrow-left-short"></i>Torna alla Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
