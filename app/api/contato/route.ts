import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Schema de validação para o formulário de contato
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar os dados do formulário
    const validatedData = contactSchema.parse(body);
    
    // Verificar se as variáveis de ambiente estão configuradas
    const email = process.env.FORM_CONTATO_EMAIL;
    const password = process.env.FORM_CONTATO_PASS;
    const smtpHost = process.env.FORM_CONTATO_SMTP;
    
    if (!email || !password || !smtpHost) {
      console.error('Variáveis de ambiente de e-mail não configuradas');
      return NextResponse.json(
        { error: 'Configuração de e-mail não encontrada' },
        { status: 500 }
      );
    }

    // Configurar o transporter do nodemailer
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: 465, // Porta SMTP segura
      secure: true, // true para porta 465, false para outras portas
      auth: {
        user: email,
        pass: password,
      },
    });

    // Verificar a conexão
    await transporter.verify();

    // Preparar o conteúdo do e-mail
    const emailContent = {
      from: `"Site Abregel" <${email}>`,
      to: email, // Enviar para o próprio e-mail configurado
      replyTo: validatedData.email, // Permitir resposta direta ao remetente
      subject: `[Contato] ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Nova Mensagem de Contato</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Sindicato Industrial</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Informações do Contato
              </h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">Nome:</strong>
                <span style="color: #333; margin-left: 10px;">${validatedData.name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">E-mail:</strong>
                <span style="color: #333; margin-left: 10px;">${validatedData.email}</span>
              </div>
              
              ${validatedData.company ? `
                <div style="margin-bottom: 15px;">
                  <strong style="color: #555;">Empresa:</strong>
                  <span style="color: #333; margin-left: 10px;">${validatedData.company}</span>
                </div>
              ` : ''}
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">Assunto:</strong>
                <span style="color: #333; margin-left: 10px;">${validatedData.subject}</span>
              </div>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Mensagem
              </h3>
              <div style="color: #555; line-height: 1.6; white-space: pre-wrap;">${validatedData.message}</div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
              <p style="margin: 0; color: #1976d2; font-size: 14px;">
                <strong>💡 Dica:</strong> Você pode responder diretamente a este e-mail para entrar em contato com ${validatedData.name}.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>Este e-mail foi enviado através do formulário de contato do site Sindicato Conecta.</p>
            <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      `,
      text: `
Nova Mensagem de Contato - Site Abregel

Informações do Contato:
- Nome: ${validatedData.name}
- E-mail: ${validatedData.email}
${validatedData.company ? `- Empresa: ${validatedData.company}` : ''}
- Assunto: ${validatedData.subject}

Mensagem:
${validatedData.message}

---
Este e-mail foi enviado através do formulário de contato do site Abregel.
Data: ${new Date().toLocaleString('pt-BR')}
      `,
    };

    // Enviar o e-mail
    const info = await transporter.sendMail(emailContent);
    
    console.log('E-mail enviado com sucesso:', info.messageId);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem enviada com sucesso!',
        messageId: info.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    
    // Se for erro de validação do Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    // Outros erros
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
