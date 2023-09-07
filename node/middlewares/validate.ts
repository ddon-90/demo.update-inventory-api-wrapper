import { json } from 'co-body'
import { RequestPayload } from '../types'

export async function validate(ctx: Context, next: () => Promise<void>) {

  const {
    vtex: { route: { params } },
    clients: { catalog }
  } = ctx

  const { refId } = params
  const payload: RequestPayload = await json(ctx.req)
  const { quantity, unlimitedQuantity } = payload
  let skuId = null

  try {
    // Get SKU ID from Reference ID
    skuId = await catalog.getSkuIdByReferenceId(String(refId));
  }
  catch {
    // Ignore
  }

  if (!skuId) {
    ctx.status = 404
    ctx.body = { name: "NOT_FOUND", message: `No product with RefId ${refId} has been found or you do not have the necessary permissions for the Catalog module.` }
  }
  
  else if (!payload.hasOwnProperty('quantity') || !(typeof quantity === 'number')) {
    ctx.status = 400
    ctx.body = { name: "BAD_REQUEST", message: 'Parameter "quantity" (Integer) is required in the request body.' }
  }

  else if (!payload.hasOwnProperty('unlimitedQuantity') || !(typeof unlimitedQuantity === 'boolean')) {
    ctx.status = 400
    ctx.body = { name: "BAD_REQUEST", message: 'Parameter "unlimitedQuantity" (Boolean) is required in the request body.' }
  }

  else {
    // Save payload and skuId in the state
    ctx.state.payload = payload
    ctx.state.skuId = skuId
    
    await next()
  }
}
