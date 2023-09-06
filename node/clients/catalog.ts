import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class Catalog extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
          'VtexIdClientAutCookie': context.adminUserAuthToken || '',
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'X-Vtex-Use-Https': 'true',
        },
      }
    )
  }

  public async getSkuIdByReferenceId(refId: string): Promise<any> {
    return this.http.get(`api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/${refId}`, {
      metric: 'get-sku-id-by-reference-id',
    })
  }
}
