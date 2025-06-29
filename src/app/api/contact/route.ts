import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";

// Inicializa o Resend com a API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuração do Redis e Rate Limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Cria um limitador: 5 requisições por dia por IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "24 h"),
  analytics: true,
  prefix: "ratelimit",
});

export async function POST(req: Request) {
  try {
    // Obter IP para rate limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

    // Verificar rate limit
    const { success, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Limite de mensagens excedido. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    const { firstName, lastName, email, subject, message } = await req.json();

    // Validações básicas
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Envia o email com HTML
    const data = await resend.emails.send({
      from: "Formulário de Contacto <onboarding@resend.dev>",
      to: ["carlosserranobicho@gmail.com"],
      subject: `Novo contacto portfolio: ${subject}`,
      replyTo: email,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
      </style>
    </head>
    <body style="background-color: #f7f7f7; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f7f7f7;" width="100%">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" width="100%">
              <tr>
                <td style="padding: 30px; text-align: center; border-bottom: 1px solid #e6e6e6;">
                  <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px; color: #333333;">Nova Mensagem do Portfólio</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px 30px 20px 30px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                  <p style="margin: 0 0 15px 0;">Você recebeu uma nova mensagem do seu formulário de contacto:</p>
                  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; background-color: #f9f9f9; border-radius: 6px;">
                    <tr>
                      <td style="padding: 15px; font-family: Arial, sans-serif; font-size: 16px;">
                        <p style="margin: 0 0 10px 0;"><strong style="color: #555555;">Nome:</strong> ${firstName} ${lastName}</p>
                        <p style="margin: 0 0 10px 0;"><strong style="color: #555555;">Email:</strong> <a href="mailto:${email}" style="color: #0066cc;">${email}</a></p>
                        <p style="margin: 0 0 10px 0;"><strong style="color: #555555;">Assunto:</strong> ${subject}</p>
                        <p style="margin: 0;"><strong style="color: #555555;">Mensagem:</strong></p>
                        <div style="margin-top: 10px; padding: 15px; background-color: #ffffff; border-left: 4px solid #0066cc; border-radius: 4px;">
                          ${message.replace(/\n/g, "<br>")}
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0;">Para responder diretamente a esta mensagem, basta clicar em responder no seu cliente de email.</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 30px; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666666; text-align: center; border-top: 1px solid #e6e6e6;">
                  <p style="margin: 0;">Enviado do formulário de contacto do seu portfólio</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
      // Mantém o texto plano como fallback para clientes que não suportam HTML
      text: `
Nome: ${firstName} ${lastName}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}
  `,
    });

    return NextResponse.json({
      success: true,
      data,
      remaining, // Retorna o número restante para informar o usuário
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem" },
      { status: 500 }
    );
  }
}
