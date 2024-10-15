const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  //Send email
  //nodemailer configuration first
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a389e7180b0055",
      pass: "f404d3f760047c",
    },
  });

  //transport
  await transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = { emailManager };
