export async function auth(ctx: Context, next: () => Promise<void>) {
  const {
    header,
    clients: { vtexId }
  } = ctx

  const appKey = header['x-vtex-api-appkey']
  const appToken = header['x-vtex-api-apptoken']

  try {
    // If appKey and appToken are not valid, the method throws a 401 error
    const login = await vtexId.login({ appKey, appToken })
    const { token } = login

    // Save generated token in the context to be used by VTEX APIs
    ctx.vtex.adminUserAuthToken = token
    await next()
  }
  catch (e) {
    ctx.status = 401
    ctx.body = { name: "UNAUTHORIZED", message: 'API AppKey or API AppToken are missing or invalid.' }
  }
}
