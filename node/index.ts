import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { updateInventory as updateInventoryMiddleware } from './middlewares/updateInventory'
// import { validate } from './middlewares/validate'

const TIMEOUT_MS = 800

// Create a LRU memory cache.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('updateInventory', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our client.
    updateInventory: {
      memoryCache,
    }
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    updateInventory: method({
      PUT: [/* validate, */updateInventoryMiddleware],
    })
  },
})
