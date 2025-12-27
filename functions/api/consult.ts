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

  const safe = (v: string) => v.toString().trim().slice(0, 1000)
  const content =
    `新咨询通知\n` +
    `姓名：${safe(name)}\n` +
    `联系方式：${safe(phone)}\n` +
    `内容：${safe(message)}\n` +
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

  let resultText = ''
  let resultJson: { errcode?: number; errmsg?: string } | null = null
  try {
    resultText = await res.text()
    resultJson = JSON.parse(resultText)
  } catch {
    // ignore
  }
  if (!res.ok || (resultJson && resultJson.errcode !== 0)) {
    const detail = resultJson ?? resultText
    return new Response(JSON.stringify({ error: 'Webhook failed', detail }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
