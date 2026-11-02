import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { readJsonData, saveJsonData } from '@/lib/github'
import defaultHome from '@/data/home.json'

const FILE_PATH = 'src/data/home.json'

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
    const data = await readJsonData(FILE_PATH, defaultHome)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching home data:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch home data' },
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
    await saveJsonData(FILE_PATH, body, 'admin(home): update homepage titles and content')

    return NextResponse.json({ success: true, message: 'Homepage content successfully updated' })
  } catch (error) {
    console.error('Error updating home data:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update home content' },
      { status: 500 }
    )
  }
}
