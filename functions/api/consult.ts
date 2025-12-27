export interface ConsultationPayload {
  name: string
  phone: string
  message: string
}

export const onRequest = async ({ request, env }: { request: Request; env: { WECHAT_WORK_WEBHOOK: string } }) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let data: ConsultationPayload
  try {
    data = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { name, phone, message } = data
  if (!name || !phone || !message) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const webhook = env.WECHAT_WORK_WEBHOOK
  if (!webhook) {
    return new Response(JSON.stringify({ error: 'Webhook not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const content =
    `新咨询通知\n` +
    `姓名：${name}\n` +
    `联系方式：${phone}\n` +
    `内容：${message}\n` +
    `时间：${new Date().toLocaleString('zh-CN', { hour12: false })}`

  const payload = {
    msgtype: 'markdown',
    markdown: { content },
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    return new Response(JSON.stringify({ error: 'Webhook failed', detail: text }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
