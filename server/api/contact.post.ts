import { MailerooClient } from 'maileroo'

export default defineEventHandler(async (event) => {
  const { name, email, message, company, phone } = await readBody(event)

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Faltan campos requeridos' })
  }

  const apiKey = process.env.MAILEROO_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'MAILEROO_API_KEY no configurada' })
  }

  const client = new MailerooClient(apiKey)
  client.setFrom('contacto@sofnet.cl', 'Sofnet Web')
  client.setTo(process.env.MAILEROO_RECEIVER_EMAIL || 'contacto@sofnet.cl')
  client.setReplyTo(email)
  client.setSubject(`Nuevo contacto Sofnet: ${name}`)
  client.setHtml(`
    <h2>Nuevo mensaje desde sofnet.cl</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
    ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
    <hr>
    <p><strong>Mensaje:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `)

  try {
    await client.sendBasicEmail()
    return { ok: true }
  } catch (error: any) {
    console.error('Maileroo error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error al enviar el mensaje' })
  }
})
