export async function getSkuId(ctx: Context, next: () => Promise<void>) {

  const {
    vtex: { route: { params } },
    clients: { catalog }
  } = ctx

  const { refId } = params

  try {
    // Get SKU ID from Reference ID
    const skuId = await catalog.getSkuIdByReferenceId(String(refId));

    // Save skuId in the state
    ctx.state.skuId = skuId
    
    await next()
  }
  catch (e) {
    ctx.status = 404
    ctx.body = { name: "NOT_FOUND", message: `No SKU with RefId ${refId} has been found or you do not have the necessary permissions for the Catalog module.` }
  }
}
