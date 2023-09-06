import { RequestPayload } from '../types'

export async function updateInventory(ctx: Context, next: () => Promise<void>) {

  const {
    vtex: { route: { params } },
    clients: { logistics }
  } = ctx

  const { warehouseId } = params
  const payload: RequestPayload = ctx.state.payload
  const skuId = ctx.state.skuId

  try {
    // Update the SKU inventory
    await logistics.updateInventoryBySkuAndWarehouse(skuId, String(warehouseId), payload)

    ctx.status = 200
    ctx.body = { name: "SUCCESS", message: `Inventory for SKU ${skuId} has been updated.` }
  }
  catch (e) {
    ctx.status = 404
    ctx.body = { name: "NOT_FOUND", message: 'No warehouse has been found with the requested Id.' }
  }

  await next()
}