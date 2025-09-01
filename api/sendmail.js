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
      console.error('Erro ao carregar o dotenv:', err);
    }
  }
};

export default async function handler(req, res) {
  // Garante que as variáveis de ambiente sejam carregadas antes de continuar
  await loadEnv();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Novo contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    });

    return res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error('Erro no handler:', error);
    return res.status(500).json({ message: "Erro ao enviar email", error: error.message });
  }
}
