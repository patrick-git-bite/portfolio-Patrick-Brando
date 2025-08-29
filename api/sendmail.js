// api/sendmail.js

// --- INÍCIO DA CORREÇÃO ---
import dotenv from 'dotenv';
import path from 'path'; // Importa o módulo 'path' do Node.js

// Configura o dotenv para LER O ARQUIVO .env.local explicitamente
// Esta é a correção principal que resolve o erro "Missing credentials"
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
// --- FIM DA CORREÇÃO ---

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Adicionei um console.log para depuração.
    // Ele vai mostrar no terminal se as variáveis foram carregadas.
    // CUIDADO: Não deixe a linha da senha (pass) em produção.
    console.log('--- Variáveis de Ambiente Carregadas ---');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Carregado' : 'NÃO CARREGADO');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Carregado' : 'NÃO CARREGADO');
    console.log('------------------------------------');

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
      text: `
        Nome: ${name}
        Email: ${email}
        Mensagem: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2 style="color: #333;">Novo Contato do Portfólio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr>
          <p><strong>Mensagem:</strong></p>
          <p style="background-color: #fff; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `
    });

    return res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error('### ERRO NO NODEMAILER ###');
    console.error(error);
    console.error('##########################');
    return res.status(500).json({ message: "Erro ao enviar email", error: error.message });
  }
}
