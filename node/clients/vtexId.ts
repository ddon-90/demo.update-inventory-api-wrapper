import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'

interface VtexIdLoginResponse {
  authStatus: string
  token: string
  expires: number
}

export default class VtexId extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        'x-vtex-user-agent': context.userAgent
      },
    })
  }

  public login({ appKey, appToken }: { appKey: string, appToken: string }): Promise<VtexIdLoginResponse> {
    return this.http.post('/api/vtexid/apptoken/login', {
      appKey,
      appToken
    }, {
      metric: 'vtexid-login'
    }
    )
  }
}
