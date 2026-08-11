import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { API_BASE_URL, getBrandImageUrl } from "../lib/api";

function HomePage() {

  const {
    addToCart,
  } = useCart();


  const [filteredProducts, setFilteredProducts] = useState([]);
  const [marchi, setMarchi] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((res) => {
        const featured = res.data.filter(
          (p) => p.is_featured === 1 || p.is_featured === true,
        );
        setFilteredProducts(featured);
      })
      .catch((err) => {
        console.error("Errore caricamento prodotti:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/brands`)
      .then((res) => setMarchi(res.data))
      .catch((err) => console.error("Errore caricamento brand:", err));
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="custom_hero">
        <div className="container-fluid p-0 mb-5">
          <div className="row g-0 align-items-stretch">
            <div className="col-lg-6 d-flex flex-column justify-content-between py-5 hero-text-col">
              <div className="d-flex align-items-center gap-3 mb-4 mb-md-5"></div>

              <h1 className="headline mb-4">
                Il meglio per
                <br />
                cani e gatti,
                <br />
                <em>ogni giorno.</em>
              </h1>

              <div>
                <p
                  className="fs-5 text-body-secondary mb-4"
                  style={{ maxWidth: "44ch" }}
                >
                  Dieci marche, dal guinzaglio al tiragraffi. Spedizione
                  gratuita in tutta Europa.
                </p>
                <div className="d-flex flex-wrap gap-2 mb-5">
                  <a
                    href="#prodotti"
                    className="btn btn-dark rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2 btn-cta"
                  >
                    Scopri i prodotti
                    <i className="bi bi-arrow-right"></i>
                  </a>
                  <a
                    href="#categorie"
                    className="btn btn-outline-dark rounded-pill px-4 py-3"
                  >
                    Sfoglia categorie
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="overflow-hidden h-100 hero-feature">
                <img
                  src="/pets/canegatto.jpg"
                  alt="Un cane e un gatto"
                  className="w-100 h-100 object-fit-cover d-block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categorie" className="container py-5 my-5">
        <header className="border-bottom pb-5 my-5">
          <h2 className="section-title mb-0">
            Due animali,
            <br />
            due <em>cataloghi.</em>
          </h2>
        </header>
        <div className="d-flex flex-column gap-3 gap-md-4 mb-5">
          <article
            id="cane"
            className="card border overflow-hidden rounded-3 cat-card mb-4"
          >
            <div className="row g-0 h-100">
              <div className="col-lg-5 order-2 order-lg-1">
                <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-between h-100 card_background">
                  <div>
                    <h3 className="cat-title mb-0">
                      Per il <em>cane</em>
                      <br />
                      di casa.
                    </h3>
                    <p
                      className="mt-4 text-body-secondary"
                      style={{ maxWidth: "38ch" }}
                    >
                      Pettorine, guinzagli, cucce, trasportini e giochi.
                    </p>
                  </div>
                  <div className="border-top mt-4 pt-4 d-flex justify-content-end">
                    <Link
                      to="/products/animal/cane"
                      className="btn btn-dark rounded-circle d-inline-flex align-items-center justify-content-center cta-circle border border-0"
                      aria-label="Sfoglia cane"
                    >
                      <i className="bi bi-arrow-right"></i>
                      </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 order-1 order-lg-2 cat-card-img-wrap">
                <img
                  src="/pets/cane.jpg"
                  alt="Cane"
                  className="w-100 h-100 object-fit-cover d-block"
                />
              </div>
            </div>
          </article>

          <article
            id="gatto"
            className="card border overflow-hidden rounded-3 cat-card"
          >
            <div className="row g-0 h-100">
              <div className="col-lg-7 cat-card-img-wrap">
                <img
                  src="/pets/gatto.jpg"
                  alt="Gatto"
                  className="w-100 h-100 object-fit-cover d-block"
                />
              </div>
              <div className="col-lg-5">
                <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-between h-100 card_background">
                  <div>
                    <h3 className="cat-title mb-0">
                      Per il <em>gatto</em>
                      <br />
                      che decide.
                    </h3>
                    <p
                      className="mt-4 text-body-secondary"
                      style={{ maxWidth: "38ch" }}
                    >
                      Tiragraffi, lettiere, ciotole e giochi.
                    </p>
                  </div>
                  <div className="border-top mt-4 pt-4 d-flex justify-content-end">
                    <Link
                      to="/products/animal/gatto"
                      className="btn btn-dark rounded-circle d-inline-flex align-items-center justify-content-center cta-circle border border-0"
                      aria-label="Sfoglia gatto"
                    >
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div >
      </section >

      {/* ── FEATURED ── */}
      <section section id="prodotti" className="container py-5 my-5" >
        <header className="border-bottom pb-3 my-5">
          <h2 className="section-title mb-0">
            Prodotti <em>in evidenza.</em>
          </h2>
        </header>

        <div className="row g-2 g-lg-3 g-xl-4">
          {filteredProducts.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={product.slug}>
              <ProductCard
                product={product}
                addToCart={() => addToCart(product, 1)}
              />
            </div>
          ))}
        </div>
      </section> 

      {/* ── BRANDS ── */}
      <section section
        id="marchi"
        className="custom_brand_bg text-light overflow-hidden"
      >
        <div className="container-fluid py-5 my-md-5 section-side-gutter">
          <header className="pb-3 mb-5 partners-head">
            <h2 className="section-title mb-0 text-light">
              Le case che <em>scegliamo,</em>
              <br />e che scelgono noi.
            </h2>
          </header>

          <p className="fs-5 mb-5 partners-lede" style={{ maxWidth: "56ch" }}>
            Prodotti europei selezionati uno per uno — per qualità dei
            materiali, rispetto degli animali e prodotti che durano nel tempo.
          </p>

          <div
            className="row row-cols-2 row-cols-md-5 g-0"
            aria-label="Marchi partner"
          >
            {marchi.map((marchio) => (
              <div
                className="col d-flex align-items-center justify-content-center p-4"
                key={marchio.id}
              >
                <img
                  src={getBrandImageUrl(marchio.logo_url)}
                  alt={marchio.name}
                  className="brand-img p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
