const nodemailer = require("nodemailer");

class Email {
  async sendEmail() {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      auth: testAccount,
    });

    const info = await transporter.sendMail(this);

    console.log("URL: " + nodemailer.getTestMessageUrl(info));
  }
}

class EmailConfirmation extends Email {
  constructor(email, address) {
    super();
    this.from = '"FindIt" <noreply@findit.com>';
    this.to = email;
    this.subject = "Email Confirmation";
    this.text = `Hi! Please confirm your registration by clicking the URL below: ${address}`;
    this.html = `<h1>Hi!</h1> Please confirm your registration by clicking the URL below: <a href="${address}">${address}</a>`;
  }
}

module.exports = { EmailConfirmation };
