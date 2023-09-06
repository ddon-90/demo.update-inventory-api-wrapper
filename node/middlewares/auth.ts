export async function auth(ctx: Context, next: () => Promise<void>) {
  const {
    header,
    clients: { vtexId }
  } = ctx

  let autheticated = false

  const appKey = header['x-vtex-api-appkey'] as string | undefined
  const appToken = header['x-vtex-api-apptoken'] as string | undefined

  if (appKey && appToken) {
    try {
      // If appKey and appToken are not valid, the method throws a 401 error
      const login = await vtexId.login({ appKey, appToken })
      const { token } = login

      if (token) {
        autheticated = true
        ctx.vtex.adminUserAuthToken = token
      }
    }
    catch {
      // Ignore
    }
  }

  if (!autheticated) {
    ctx.status = 401
    ctx.body = { name: "UNAUTHORIZED", message: 'API AppKey or API AppToken are missing or invalid.' }
  }
  else {
    await next()
  }
}
