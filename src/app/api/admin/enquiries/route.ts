import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { readJsonData, saveJsonData } from '@/lib/github'
import defaultEnquiries from '@/data/enquiries.json'
import type { Enquiry } from '@/types/enquiry'

const FILE_PATH = 'src/data/enquiries.json'

async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch {
    return false
  }
}

// GET all enquiries for Admin Dashboard
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const enquiries = await readJsonData<Enquiry[]>(FILE_PATH, defaultEnquiries as Enquiry[])
    return NextResponse.json({ enquiries })
  } catch (error) {
    console.error('Error fetching enquiries:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch enquiries' },
      { status: 500 }
    )
  }
}

// PUT: Update an enquiry's status or notes
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 })
    }

    const currentList = await readJsonData<Enquiry[]>(FILE_PATH, defaultEnquiries as Enquiry[])
    const index = currentList.findIndex((item) => item.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }

    if (status) currentList[index].status = status
    if (notes !== undefined) currentList[index].notes = notes

    await saveJsonData(
      FILE_PATH,
      currentList,
      `admin(enquiry): update status of ${currentList[index].name} to ${currentList[index].status}`
    )

    return NextResponse.json({ success: true, enquiry: currentList[index] })
  } catch (error) {
    console.error('Error updating enquiry:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update enquiry' },
      { status: 500 }
    )
  }
}

// DELETE: Delete an enquiry
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 })
    }

    const currentList = await readJsonData<Enquiry[]>(FILE_PATH, defaultEnquiries as Enquiry[])
    const filteredList = currentList.filter((item) => item.id !== id)

    if (filteredList.length === currentList.length) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }

    await saveJsonData(
      FILE_PATH,
      filteredList,
      `admin(enquiry): delete enquiry record ${id}`
    )

    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' })
  } catch (error) {
    console.error('Error deleting enquiry:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete enquiry' },
      { status: 500 }
    )
  }
}
