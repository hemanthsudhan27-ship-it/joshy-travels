import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { readJsonData, saveJsonData } from '@/lib/github'
import defaultAbout from '@/data/about.json'

const FILE_PATH = 'src/data/about.json'

async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch {
    return false
  }
}

export async function GET() {
  try {
    const data = await readJsonData(FILE_PATH, defaultAbout)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching about data:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch about data' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    await saveJsonData(FILE_PATH, body, 'admin(about): update about page narrative and milestones')

    return NextResponse.json({ success: true, message: 'About page content successfully updated' })
  } catch (error) {
    console.error('Error updating about data:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update about content' },
      { status: 500 }
    )
  }
}
