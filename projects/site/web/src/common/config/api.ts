// Imports
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

// Project imports
// @ts-ignore
import type { AppRouter } from '../../../../../api/core/src/server/endpoint'

// Common imports
import { params } from '@packages/common/build/params.js'

// Local imports
import { URL_API_CORE } from '@/common/config/env'

// api

// http
const httpLink = httpBatchLink({
  url: `${URL_API_CORE}${params.common.endpoint.rpc}`,
})

// @ts-ignore
export const api = createTRPCProxyClient<AppRouter>({
  links: [httpLink],
})
