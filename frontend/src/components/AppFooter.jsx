import booldog_logo from "../assets/logo/Booldog_logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AppFooter() {
  const [openCookiePolicy, setOpenCookiePolicy] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [openTermsPolicy, setOpenTermsPolicy] = useState(false);

  function toggleCookiePolicy() {
    setOpenCookiePolicy(!openCookiePolicy);
  }
  function togglePrivacyPolicy() {
    setOpenPrivacyPolicy(!openPrivacyPolicy);
  }
  function toggleTermsPolicy() {
    setOpenTermsPolicy(!openTermsPolicy);
  }

  return (
    <footer className="py-4 mt-auto container-fluid text-black ">
      <div className="d-flex justify-content-center  mb-5">
        <img className="logo_footer img_no_hover" src={booldog_logo} alt="BoolDog logo" />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 d-flex">

        <div className="col d-flex flex-column  ">
          <ul className="list-unstyled d-flex flex-column gap-2">
            <li>
              <h3 className="text-black">Informazioni legali e aziendali</h3>
            </li>

            <li className="d-flex gap-2 text-black">
              <span className="text-black">Ragione sociale:</span>
              <span className="text-black">BoolDog S.r.l.</span>
            </li>

            <li className="d-flex gap-2 text-black flex-wrap">
              <span className="text-black">Sede&nbsp;legale:</span>
              <span className="text-black">Via BoolStreat, 7 - 20121 Milano(MI)</span>
            </li>

            <li className="d-flex gap-2 text-black">
              <span className="text-black">P.IVA:</span>
              <span className="text-black">IT 04782631098</span>
            </li>

            <li className="d-flex gap-2 text-black">
              <span className="text-black">REA:</span>
              <span className="text-black">MI - 2187634</span>
            </li>

            <li className="d-flex gap-2 text-black">
              <span className="text-black">Capitale sociale:</span>
              <span className="text-black">€10.000,00 i.v.</span>
            </li>

            <li className="d-flex gap-2 text-black">
              <span className="text-black">PEC:</span>
              <span className="text-black">booldog@pec.it</span>
            </li>

            <li className="d-flex gap-2 text-black">
              <div className="d-flex flex-column align-items-start">
                <button
                  onClick={toggleCookiePolicy}
                  className="hover_footer border border-0 bg-transparent ps-0"
                >
                  <span className="text-black">Cookie Policy</span>
                </button>
                {openCookiePolicy && (
                  <div className="card p-2 mb-3">
                    <p className="text-black text-center m-0">
                      Questo sito utilizza cookie tecnici e, previo consenso, cookie
                      di profilazione. Per maggiori informazioni consulta la nostra
                      Cookie Policy.
                    </p>
                  </div>
                )}
              </div>

            </li>

            <li className="d-flex gap-2 text-black">
              <div className="d-flex flex-column align-items-start">
                <button
                  onClick={togglePrivacyPolicy}
                  className="hover_footer border border-0 bg-transparent ps-0"
                >
                  <span className="text-black">Privacy Policy</span>
                </button>
                {openPrivacyPolicy && (
                  <div className="card p-2 mb-3">
                    <p className="text-black text-center">
                      I dati personali sono trattati da BoolDog S.r.l. in qualità di
                      Titolare del Trattamento, ai sensi del Regolamento UE 2016/679
                      (GDPR).
                    </p>
                  </div>
                )}
              </div>

            </li>

            <li className="d-flex gap-2 text-black">
              <div className="d-flex flex-column align-items-start">
                <button
                  onClick={toggleTermsPolicy}
                  className="hover_footer border border-0 bg-transparent ps-0"
                >
                  <span className="text-black">Termini e Condizioni</span>
                </button>
                {openTermsPolicy && (
                  <div className="card p-2 mb-3">
                    <p className="text-black text-center">
                      L'acquisto dei prodotti su booldog.it è regolato dai presenti
                      Termini e Condizioni. Il consumatore ha diritto di recesso
                      entro 14 giorni dalla ricezione del prodotto.
                    </p>
                  </div>
                )}
              </div>

            </li>


          </ul>
        </div>




        <div className="col d-flex flex-column align-items-start align-items-lg-center align-self-start">
          <ul className="list-unstyled d-flex flex-column gap-2">
            <li>
              <h3 className="text-black">Navigazione utile</h3>
            </li>
            <Link className="text-decoration-none" to="/">
              <li className="hover_footer text-black">Homepage</li>
            </Link>
            <Link className="text-decoration-none" to="/products">
              <li className="hover_footer text-black">Prodotti</li>
            </Link>
            <Link className="text-decoration-none" to="/wishlist">
              <li className="hover_footer text-black">
                I tuoi prodotti preferiti
              </li>
            </Link>
          </ul>
        </div>

        <div className="col d-flex flex-column align-items-start align-items-lg-end align-self-start">
          <ul className="list-unstyled d-flex flex-column gap-2">
            <li>
              <h3 className="text-black">Assistenza clienti</h3>
            </li>
            <li className="d-flex gap-3">
              <span className="text-black">Email:</span>
              <span className="text-black">info@booldog.it</span>
            </li>
            <li className="d-flex gap-3">
              <span className="text-black">Telefono:</span>
              <span className="text-black">+39 02 4871 2233</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 mt-3 g-4">
        <div className="col d-flex flex-column align-items-center">
          <ul className="list-unstyled d-flex flex-column align-items-center">
            <li>
              <h3 className="text-black">Pagamenti e sicurezza</h3>
            </li>

            <li className="row g-3 justify-content-center text-center text-black">
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-visa fa-2x"></i>
              </div>
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-mastercard fa-2x"></i>
              </div>
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-paypal fa-2x"></i>
              </div>
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-apple-pay fa-2x"></i>
              </div>
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-stripe fa-2x"></i>
              </div>
            </li>
          </ul>
        </div>

        <div className="col d-flex flex-column align-items-center">
          <ul className="list-unstyled d-flex flex-column align-items-center">
            <li>
              <h3 className="text-black">Social</h3>
            </li>

            <li className="row g-3 justify-content-center text-center text-black">
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-black">
                  <i className="fa-brands fa-instagram fa-2x"></i>
                </a>
              </div>
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-black">
                  <i className="fa-brands fa-facebook fa-2x"></i>
                </a>
              </div>
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-black">
                  <i className="fa-brands fa-tiktok fa-2x"></i>
                </a>
              </div>
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-black">
                  <i className="fa-brands fa-x-twitter fa-2x"></i>
                </a>
              </div>
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-black">
                  <i className="fa-brands fa-whatsapp fa-2x"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-2  ">
        <span className="text-black mb-0 small">
          © {new Date().getFullYear()} BoolDog — Tutti i diritti riservati
        </span>
      </div>
    </footer>
  );
}
