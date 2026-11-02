import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { readJsonData, saveJsonData } from '@/lib/github'
import defaultServices from '@/data/services.json'

const FILE_PATH = 'src/data/services.json'

interface ServicesData {
  hero: {
    overline: string
    titlePrefix: string
    titleAccent: string
    description: string
  }
  services: Array<{
    id: string
    number: string
    title: string
    category: string
    description: string
    image: string
    slug: string
  }>
  coreValues: Array<{
    number: string
    title: string
    description: string
  }>
}

async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch {
    return false
  }
}

// GET all services data
export async function GET() {
  try {
    const data = await readJsonData<ServicesData>(FILE_PATH, defaultServices as ServicesData)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

// PUT: Update full services object or individual items
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const currentData = await readJsonData<ServicesData>(FILE_PATH, defaultServices as ServicesData)

    // Can accept full object or partial updates
    const updatedData: ServicesData = {
      hero: body.hero || currentData.hero,
      services: body.services || currentData.services,
      coreValues: body.coreValues || currentData.coreValues,
    }

    await saveJsonData(FILE_PATH, updatedData, 'admin(services): update services and core values')
    return NextResponse.json({ success: true, data: updatedData })
  } catch (error) {
    console.error('Error updating services:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update services' },
      { status: 500 }
    )
  }
}

// POST: Add a new service item
export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const newService = await req.json()
    if (!newService.title) {
      return NextResponse.json({ error: 'Service title is required' }, { status: 400 })
    }

    const currentData = await readJsonData<ServicesData>(FILE_PATH, defaultServices as ServicesData)

    if (!newService.id) {
      newService.id = `svc-${Date.now()}`
    }
    if (!newService.number) {
      newService.number = String(currentData.services.length + 1).padStart(2, '0')
    }

    currentData.services.push(newService)
    await saveJsonData(FILE_PATH, currentData, `admin(services): add service ${newService.title}`)

    return NextResponse.json({ success: true, item: newService })
  } catch (error) {
    console.error('Error adding service:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add service' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a service by id
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    const currentData = await readJsonData<ServicesData>(FILE_PATH, defaultServices as ServicesData)
    const filteredServices = currentData.services.filter((s) => s.id !== id)

    if (filteredServices.length === currentData.services.length) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    currentData.services = filteredServices
    await saveJsonData(FILE_PATH, currentData, `admin(services): delete service ${id}`)

    return NextResponse.json({ success: true, message: 'Service deleted successfully' })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete service' },
      { status: 500 }
    )
  }
}
