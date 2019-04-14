import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox9a5a9f0a85f0431d88c12643de014447.mailgun.org"
});
