export const onRequest = async ({ env }: { env: { WECHAT_WORK_WEBHOOK?: string } }) => {
  return new Response(JSON.stringify({ ok: true, hasWebhook: !!env.WECHAT_WORK_WEBHOOK }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
