import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { readJsonData, saveJsonData } from '@/lib/github'
import defaultPackages from '@/data/packages.json'
import type { PackageDetail } from '@/data/packagesData'

const FILE_PATH = 'src/data/packages.json'

async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch {
    return false
  }
}

// GET all packages
export async function GET() {
  try {
    const packages = await readJsonData<PackageDetail[]>(FILE_PATH, defaultPackages as PackageDetail[])
    return NextResponse.json({ items: packages })
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

// POST: Add new package
export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const newPkg: PackageDetail = await req.json()
    if (!newPkg.title || !newPkg.slug) {
      return NextResponse.json({ error: 'Package Title and Slug are required' }, { status: 400 })
    }

    const currentList = await readJsonData<PackageDetail[]>(FILE_PATH, defaultPackages as PackageDetail[])

    // Ensure unique ID and slug
    if (!newPkg.id) {
      newPkg.id = `pkg-${Date.now()}`
    }

    const existingIdx = currentList.findIndex((p) => p.slug === newPkg.slug || p.id === newPkg.id)
    if (existingIdx !== -1) {
      return NextResponse.json({ error: 'A package with this slug or ID already exists.' }, { status: 400 })
    }

    const updatedList = [newPkg, ...currentList]
    await saveJsonData(FILE_PATH, updatedList, `admin(packages): add new package ${newPkg.title}`)

    return NextResponse.json({ success: true, item: newPkg })
  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create package' },
      { status: 500 }
    )
  }
}

// PUT: Update existing package
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updatedPkg: PackageDetail = await req.json()
    if (!updatedPkg.id && !updatedPkg.slug) {
      return NextResponse.json({ error: 'Package ID or Slug required for update' }, { status: 400 })
    }

    const currentList = await readJsonData<PackageDetail[]>(FILE_PATH, defaultPackages as PackageDetail[])
    const index = currentList.findIndex(
      (p) => p.id === updatedPkg.id || p.slug === updatedPkg.slug
    )

    if (index === -1) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    currentList[index] = { ...currentList[index], ...updatedPkg }
    await saveJsonData(FILE_PATH, currentList, `admin(packages): update package ${updatedPkg.title}`)

    return NextResponse.json({ success: true, item: currentList[index] })
  } catch (error) {
    console.error('Error updating package:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update package' },
      { status: 500 }
    )
  }
}

// DELETE: Delete package by ID or Slug
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const slug = searchParams.get('slug')

    if (!id && !slug) {
      return NextResponse.json({ error: 'Provide package ID or Slug to delete' }, { status: 400 })
    }

    const currentList = await readJsonData<PackageDetail[]>(FILE_PATH, defaultPackages as PackageDetail[])
    const filteredList = currentList.filter(
      (p) => (id ? p.id !== id : true) && (slug ? p.slug !== slug : true)
    )

    if (filteredList.length === currentList.length) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    await saveJsonData(FILE_PATH, filteredList, `admin(packages): delete package ${id || slug}`)
    return NextResponse.json({ success: true, message: 'Package deleted successfully' })
  } catch (error) {
    console.error('Error deleting package:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete package' },
      { status: 500 }
    )
  }
}
