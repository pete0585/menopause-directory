import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (req.headers.get('origin') !== new URL(req.url).origin) return NextResponse.json({ error: 'Request origin is not allowed' }, { status: 403 })
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (!expectedEmail) return NextResponse.json({ error: 'Administrator identity is not configured' }, { status: 503 })
  const session = await createClient()
  const { data: { user }, error: authError } = await session.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
  if (!user.email_confirmed_at || user.email?.trim().toLowerCase() !== expectedEmail) return NextResponse.json({ error: 'Administrator access required' }, { status: 403 })
  const { id } = await params
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)) return NextResponse.json({ error: 'Invalid listing' }, { status: 400 })
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return NextResponse.json({ error: 'Invalid review action' }, { status: 400 })
  const values = body as Record<string, unknown>
  if (Object.keys(values).length !== 2 || Object.keys(values).some(key => !['is_approved', 'is_active'].includes(key)) || typeof values.is_approved !== 'boolean' || values.is_active !== values.is_approved) {
    return NextResponse.json({ error: 'Only an explicit approve or reject review action is allowed' }, { status: 400 })
  }
  const service = await createServiceClient()
  const { data, error } = await service.from('menopause_listings').update({ is_approved: values.is_approved, is_active: values.is_active }).eq('id', id).select('id,is_approved,is_active').maybeSingle()
  if (error) return NextResponse.json({ error: 'Review could not be saved' }, { status: 503 })
  if (!data) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  if (data.id !== id || data.is_approved !== values.is_approved || data.is_active !== values.is_active) return NextResponse.json({ error: 'Review result was not confirmed' }, { status: 409 })
  return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } })
}
