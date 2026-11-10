import { createServiceClient } from '@/lib/supabase/server'
import { createInboundHandler } from '@/lib/directory-inbound'

export const POST = createInboundHandler({
  "tenant": "directories--menopause",
  "directory": "menopause",
  "domains": [
    "menopausedirectory.co",
    "mail.menopausedirectory.co"
  ]
}, { db: async () => createServiceClient() })
