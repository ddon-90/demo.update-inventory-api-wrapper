import { json } from 'co-body'
import { RequestPayload } from '../types'

export async function updateInventory(ctx: Context, next: () => Promise<void>) {

  const {
    vtex: { route: { params } },
    clients: { logistics }
  } = ctx

  const { refId, warehouseId } = params
  const payload: RequestPayload = await json(ctx.req)
  const skuId = ctx.state.skuId

  // Error handling
  if (!payload.hasOwnProperty('quantity') || !(typeof payload.quantity === 'number')) {
    ctx.status = 400
    ctx.body = { name: "BAD_REQUEST", message: 'Parameter "quantity" (Integer) is required in the request body.' }
  }

  else if (!payload.hasOwnProperty('unlimitedQuantity') || !(typeof payload.unlimitedQuantity === 'boolean')) {
    ctx.status = 400
    ctx.body = { name: "BAD_REQUEST", message: 'Parameter "unlimitedQuantity" (Boolean) is required in the request body.' }
  }

  else {
    try {
      // Update the SKU inventory
      await logistics.updateInventoryBySkuAndWarehouse(skuId, String(warehouseId), payload)

      ctx.status = 200
      ctx.body = { name: "SUCCESS", message: `Inventory for SKU with RefId ${refId} has been updated.` }
    }
    catch (e) {
      ctx.status = 404
      ctx.body = { name: "NOT_FOUND", message: `No warehouse with Id ${warehouseId} has been found or you do not have the necessary permissions for the Logistic module.` }
    }
  }

  await next()
}