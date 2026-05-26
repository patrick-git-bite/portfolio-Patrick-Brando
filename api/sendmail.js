// api/sendmail.js
import nodemailer from "nodemailer";

// Esta função só será executada se não estivermos em produção
// e só se o dotenv ainda não tiver sido carregado.
const loadEnv = async () => {
  if (process.env.NODE_ENV !== 'production' && !process.env.EMAIL_USER) {
    try {
      const dotenv = await import('dotenv');
      const path = await import('path');
      dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
    } catch (err) {
      // Bloco catch vazio, pois em produção não precisamos nos preocupar
      // com o dotenv falhando, já que ele nem será executado.
    }
  }
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;

export default async function handler(req, res) {
  await loadEnv();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const trimmedName = String(name).trim().slice(0, MAX_NAME);
  const trimmedEmail = String(email).trim().slice(0, MAX_EMAIL);
  const trimmedMessage = String(message).trim().slice(0, MAX_MESSAGE);

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ message: "Email inválido." });
  }

  if (trimmedName.length < 2) {
    return res.status(400).json({ message: "Nome muito curto." });
  }

  if (trimmedMessage.length < 10) {
    return res.status(400).json({ message: "Mensagem muito curta." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">Novo contato do Portfolio</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Nome:</td><td style="padding: 8px;">${trimmedName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${trimmedEmail}">${trimmedEmail}</a></td></tr>
        </table>
        <h3 style="color: #6366f1; margin-top: 20px;">Mensagem:</h3>
        <p style="background: #f3f4f6; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${trimmedMessage}</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: trimmedEmail,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] Novo contato de ${trimmedName}`,
      text: `Nome: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMensagem:\n${trimmedMessage}`,
      html: htmlBody,
    });

    return res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Sendmail error:", error?.message);
    return res.status(500).json({ message: "Ocorreu um erro interno ao enviar o email." });
  }
}
