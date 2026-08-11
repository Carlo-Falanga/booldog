export default function GridListButton({ setIsGridView }) {
  return (
    <div className="rounded-pill bg-paper border d-flex">
      <button
        className="btn border-0 p-2"
        onClick={() => setIsGridView(true)}
        aria-label="Vista a griglia"
      >
        <i className="bi bi-grid d-flex"></i>
      </button>
      <button
        className="btn border-0 p-2"
        onClick={() => setIsGridView(false)}
        aria-label="Vista a elenco"
      >
        <i className="bi bi-list d-flex"></i>
      </button>
    </div>
  );
}
