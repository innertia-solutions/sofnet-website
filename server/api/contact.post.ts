import SibApiV3Sdk from 'sib-api-v3-sdk'

export default defineEventHandler(async (event) => {
  const { name, email, message, company, phone } = await readBody(event)

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Faltan campos requeridos' })
  }

  const client = SibApiV3Sdk.ApiClient.instance
  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'BREVO_API_KEY no configurada' })
  }

  client.authentications['api-key'].apiKey = apiKey
  const api = new SibApiV3Sdk.TransactionalEmailsApi()

  try {
    await api.sendTransacEmail({
      subject: `Nuevo contacto Sofnet: ${name}`,
      sender: {
        name: 'Sofnet Web',
        email: process.env.BREVO_SENDER_EMAIL || 'contacto@sofnet.cl',
      },
      to: [{ email: process.env.BREVO_RECEIVER_EMAIL || 'contacto@sofnet.cl' }],
      replyTo: { email, name },
      htmlContent: `
        <h2>Nuevo mensaje desde sofnet.cl</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
    return { ok: true }
  } catch (error: any) {
    console.error('Brevo error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error al enviar el mensaje' })
  }
})
