import { json } from 'co-body'
import { RequestPayload } from '../types'

export async function updateInventory(ctx: Context, next: () => Promise<void>) {

  const {
    vtex: { route: { params } },
    clients: { catalog, logistics }
  } = ctx

  const { refId, warehouseId } = params
  const payload: RequestPayload = await json(ctx.req)

  try {
    // Get SKU ID from Reference ID
    const skuId = await catalog.getSkuIdByReferenceId(String(refId));
    
    // Update the SKU inventory
    await logistics.updateInventoryBySkuAndWarehouse(skuId, String(warehouseId), payload)

    ctx.status = 200
    ctx.body = { status: "SUCCESS", message: "SKU inventory has been updated" }
  }
  catch (e) {
    ctx.status = 500
    ctx.body = { status: "ERROR", message: e.message }
  }

  await next()
}