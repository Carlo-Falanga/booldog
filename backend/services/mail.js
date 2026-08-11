const nodemailer = require("nodemailer");

// built once and reused
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MY_USER,
    pass: process.env.MY_PASS,
  },
});

const sendOrderConfirmation = async (order) => {
  const { email, user_full_name, order_code, total, items } = order;

  const itemsHtml = items
    .map((item) => `<li>${item.name} x ${item.quantity}</li>`)
    .join("");

  return transporter.sendMail({
    from: "no-reply@booldog.it",
    to: email,
    subject: `Conferma ordine ${order_code}`,
    text: `Ciao ${user_full_name}, il tuo ordine ${order_code} e' stato ricevuto. Totale: €${total.toFixed(2)}`,
    html: `<div style="font-family: Arial, sans-serif; color: #333; padding: 20;">
    <h2>Grazie per il tuo ordine, ${user_full_name}!</h2>
    <p>Codice ordine: <strong>${order_code}</strong></p>
    <ul>${itemsHtml}</ul>
    <p>Totale: <strong>€${total.toFixed(2)}</strong></p>
    
    </div>
    `,
  });
};

const sendAdminOrderConfirmation = async (order) => {
  const { email, user_full_name, order_code, total, items } = order;

  const itemsHtml = items
    .map((item) => `<li>${item.name} x ${item.quantity}</li>`)
    .join("");

  return transporter.sendMail({
    from: "no-reply@booldog.it",
    to: "booldogservice@gmail.com",
    subject: `Ordine ricevuto ${order_code}`,
    text: `Hai ricevuto un nuovo ordine da ${user_full_name}, Il codice ordine e' ${order_code}. Totale: €${total.toFixed(2)}`,
    html: `<div style="font-family: Arial, sans-serif; color: #333; padding: 20;">
    <h2>Nuovo ordine da ${user_full_name}!</h2>
    <p>Codice ordine: <strong>${order_code}</strong></p>
    <ul>${itemsHtml}</ul>
    <p>Totale: <strong>€${total.toFixed(2)}</strong></p>
    
    </div>
    `,
  });
};

module.exports = { sendOrderConfirmation, sendAdminOrderConfirmation };
