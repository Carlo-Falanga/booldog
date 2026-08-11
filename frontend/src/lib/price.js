export function formatPrice(value) {
  return Number(value).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}

// the big totals show the cents smaller and in the accent colour
export function splitPrice(value) {
  const [euros, cents] = Number(value).toFixed(2).split(".");
  return { euros, cents };
}
