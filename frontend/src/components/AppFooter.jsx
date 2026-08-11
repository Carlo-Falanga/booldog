import { Link } from "react-router-dom";
import { useState } from "react";
import booldog_logo from "../assets/logo/Booldog_logo.png";

const SHOP_LINKS = [
  { label: "Homepage", to: "/" },
  { label: "Prodotti", to: "/products" },
  { label: "I tuoi preferiti", to: "/wishlist" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", icon: "bi-instagram" },
  { label: "Facebook", icon: "bi-facebook" },
  { label: "TikTok", icon: "bi-tiktok" },
  { label: "X", icon: "bi-twitter-x" },
  { label: "WhatsApp", icon: "bi-whatsapp" },
];

const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "PayPal",
  "Apple Pay",
  "Stripe",
];

const POLICIES = [
  {
    id: "cookie",
    label: "Cookie Policy",
    text: "Questo sito utilizza cookie tecnici e, previo consenso, cookie di profilazione. Per maggiori informazioni consulta la nostra Cookie Policy.",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    text: "I dati personali sono trattati da BoolDog S.r.l. in qualità di Titolare del Trattamento, ai sensi del Regolamento UE 2016/679 (GDPR).",
  },
  {
    id: "terms",
    label: "Termini e Condizioni",
    text: "L'acquisto dei prodotti su booldog.it è regolato dai presenti Termini e Condizioni. Il consumatore ha diritto di recesso entro 14 giorni dalla ricezione del prodotto.",
  },
];

export default function AppFooter() {
  const [openPolicy, setOpenPolicy] = useState(null);

  const togglePolicy = (id) => {
    setOpenPolicy(openPolicy === id ? null : id);
  };

  const openPolicyText = POLICIES.find((policy) => policy.id === openPolicy);

  return (
    <footer className="mt-auto">
      <div className="container py-5">
        <div className="row g-4 g-lg-5">
          <div className="col-12 col-lg-3">
            <img
              className="footer-logo mb-4"
              src={booldog_logo}
              alt="BoolDog"
            />
            <ul className="footer-social list-unstyled d-flex gap-3 mb-0">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a href="#" aria-label={social.label}>
                    <i className={`bi ${social.icon}`}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="cart-meta mb-3">Negozio</h2>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {SHOP_LINKS.map((link) => (
                <li key={link.to}>
                  <Link className="footer-link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="cart-meta mb-3">Assistenza</h2>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <a className="footer-link" href="mailto:info@booldog.it">
                  info@booldog.it
                </a>
              </li>
              <li>
                <a className="footer-link" href="tel:+390248712233">
                  +39 02 4871 2233
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-lg-3">
            <h2 className="cart-meta mb-3">Pagamenti</h2>
            <p className="footer-payments mb-0">
              {PAYMENT_METHODS.join(" · ")}
            </p>
          </div>
        </div>

        <div className="footer-legal mt-5 pt-4">
          <p className="mb-2">
            BoolDog S.r.l. · Via BoolStreat 7, 20121 Milano (MI) · P.IVA IT
            04782631098 · REA MI-2187634 · Capitale sociale €10.000,00 i.v. ·
            PEC booldog@pec.it
          </p>

          <div className="d-flex flex-wrap align-items-center gap-3">
            <span>© {new Date().getFullYear()} BoolDog</span>
            {POLICIES.map((policy) => (
              <button
                key={policy.id}
                type="button"
                className="footer-policy-button"
                onClick={() => togglePolicy(policy.id)}
              >
                {policy.label}
              </button>
            ))}
          </div>

          {openPolicyText && (
            <p className="footer-policy-text mt-3 mb-0">
              {openPolicyText.text}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
