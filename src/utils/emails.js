const nodemailer = require("nodemailer");

const emailConfigurationProd = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
};

const emailConfigurationDev = (testAccount) => ({
  host: "smtp.ethereal.email",
  auth: testAccount,
});

async function createEmailConfig() {
  if (process.env.NODE_ENV === "production") {
    return emailConfigurationProd;
  }
  const testAccount = await nodemailer.createTestAccount();
  return emailConfigurationDev(testAccount);
}

class Email {
  async sendEmail() {
    const emailConfiguration = await createEmailConfig();
    const transporter = nodemailer.createTransport(emailConfiguration);

    const info = await transporter.sendMail(this);

    if (process.env.NODE_ENV !== "production") {
      console.log("URL: " + nodemailer.getTestMessageUrl(info));
    }
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
