import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/useCart';
import ProductCard from '../components/ProductCard';
import ProductCardList from '../components/ProductCardList';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../lib/api';

export default function SearchPage() {

    const { animalSlug } = useParams();
    const endpoint = animalSlug ?? '';

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const order = searchParams.get('sort') || '';

    const [listView, setListView] = useState(false);

    const url = animalSlug
        ? `${API_BASE_URL}/products/animal/${endpoint}`
        : `${API_BASE_URL}/products`;
    const queryUrl = `${url}?sort=${order}&search=${search}`;

    const [products, setProducts] = useState([]);
    // the url the shown results came from, so loading is derived instead of stored
    const [loadedQueryUrl, setLoadedQueryUrl] = useState(null);
    const isLoading = loadedQueryUrl !== queryUrl;

    useEffect(() => {
        axios.get(queryUrl)
            .then(res => {
                setProducts(res.data);
                setLoadedQueryUrl(queryUrl);
            });
    }, [queryUrl]);

    function handleFilterChange(key, value) {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        }
        else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    }

    const { addToCart } = useCart();

    const sortOptions = [
        { value: '', label: 'Novità' },
        { value: 'price-up', label: 'Prezzo ↑' },
        { value: 'price-down', label: 'Prezzo ↓' },
        { value: 'name', label: 'Nome' },
    ];

    const pageTitle = animalSlug
        ? animalSlug.charAt(0).toUpperCase() + animalSlug.slice(1)
        : 'Catalogo';

    const imageName = animalSlug ? `${animalSlug}` : 'cane-gatto'


    return (
        <>

            {/* hero */}
            <section className=" px-3 px-md-5 pt-5 pb-4 bg-paper mb-5">
                <div className="container-fluid">

                    {/* breadcrumb */}
                    <nav className="d-flex align-items-center gap-2 mb-4 eyebrow">
                        <span>Booldog</span>
                        <span className="text-secondary">/</span>
                        <span>{pageTitle}</span>
                        <span className="flex-grow-1 border-top d-none d-sm-block mx-2" style={{ maxWidth: 320 }} />
                        <span className="text-muted">{products.length} articoli</span>
                    </nav>

                    {/* heading + lede + stats */}
                    <div className="row align-items-center g-4 g-lg-5">

                        <div className="col-12 col-lg-6">
                            <h1 className="sp-hero-title mb-2">
                                {animalSlug
                                    ? <>Per il tuo<br /><em>{pageTitle}.</em></>
                                    : <>Tutto il<br /><em>catalogo.</em></>}
                            </h1>
                            <p className="sp-lede ">
                                {animalSlug
                                    ? `Prodotti pensati per il tuo ${pageTitle.toLowerCase()}. Marchi europei, spediti da Milano in 24/48h.`
                                    : "Ogni articolo su Booldog, in un'unica vista. Marchi europei, accessori e cucce."}
                            </p>

                        </div>

                        <div className="col-12 col-lg-6">
                            <img src={`/pets/${imageName}-search-page.jpg`} alt={imageName} className='w-100  d-none d-lg-inline-block ' />


                        </div>

                    </div>
                </div>
            </section>

            {/* toolbar e griglia*/}
            <section className="px-3 px-md-5 py-4">
                <div className="container-xxl">

                    {/* toolbar */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pb-3 border-bottom border-dark mb-4">

                        {/* sinistra: contatore + cancella ricerca */}
                        <div className="d-flex align-items-center gap-3">
                            <span className="eyebrow text-muted">
                                <span className="sp-toolbar-count">{products.length}</span>&nbsp;articoli
                            </span>
                            {search && (
                                <button
                                    className="btn btn-sm btn-outline-secondary rounded-pill d-inline-flex align-items-center gap-1"
                                    onClick={() => handleFilterChange('search', '')}
                                >
                                    <i className="bi bi-x-lg" style={{ fontSize: 10 }} />
                                    &ldquo;{search}&rdquo;
                                </button>
                            )}
                        </div>

                        {/* destra: sort + toggle vista */}
                        <div className="d-flex align-items-center gap-2">

                            {/* select ordina */}
                            <div className="sp-sort-wrap d-flex align-items-center gap-2 border rounded-pill px-3 py-1">
                                <span className="text-muted eyebrow">Ordina <span className=' d-none d-md-inline'>·</span></span>
                                <select
                                    className="sp-select border-0 bg-transparent fw-medium"
                                    value={order}
                                    onChange={e => handleFilterChange('sort', e.target.value)}
                                    aria-label="Ordina per"
                                >
                                    {sortOptions.map(o => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* toggle griglia / lista */}
                            <div className="sp-views d-flex gap-1 border rounded-pill p-1">
                                <button
                                    className={`sp-view-btn btn p-0${!listView ? ' active' : ''}`}
                                    onClick={() => setListView(false)}
                                    aria-label="Vista griglia"
                                    title="Griglia"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.6">
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                    </svg>
                                </button>
                                <button
                                    className={`sp-view-btn btn p-0${listView ? ' active' : ''}`}
                                    onClick={() => setListView(true)}
                                    aria-label="Vista lista"
                                    title="Lista"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="3" y1="18" x2="21" y2="18" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* prodotti */}
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
                            <Loader />
                        </div>
                    ) : products.length > 0 ? (
                        <div className={`row ${listView ? 'g-2 g-lg-3 g-xl-4' : 'g-2 g-lg-3 g-xl-4'}`}>
                            {products.map(product => (
                                listView ? (
                                    <div key={product.slug} className="col-12">
                                        <ProductCardList
                                            product={product}
                                            animalType={endpoint}

                                        />
                                    </div>
                                ) : (
                                    <div key={product.slug} className="col-12 col-sm-6 col-md-4 col-xl-3">
                                        <ProductCard
                                            product={product}
                                            animalType={endpoint}
                                            addToCart={() => addToCart(product, 1)}
                                        />
                                    </div>
                                )
                            ))}
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
                            <h2 className="text-center">Nessun prodotto trovato</h2>
                        </div>
                    )}

                </div>
            </section>

        </>
    );
}