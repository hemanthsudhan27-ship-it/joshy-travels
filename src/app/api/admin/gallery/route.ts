import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { readJsonData, saveJsonData, saveUploadedImage } from '@/lib/github'
import defaultGallery from '@/data/gallery.json'
import type { GalleryItem } from '@/data/galleryData'

const FILE_PATH = 'src/data/gallery.json'

async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch {
    return false
  }
}

// GET all gallery items
export async function GET() {
  try {
    const items = await readJsonData<GalleryItem[]>(FILE_PATH, defaultGallery as GalleryItem[])
    return NextResponse.json({ items })
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

// POST: Add new gallery item (supports multipart form with image file OR json body)
export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contentType = req.headers.get('content-type') || ''
    let newItem: GalleryItem

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      const title = (formData.get('title') as string) || ''
      const location = (formData.get('location') as string) || ''
      const category = (formData.get('category') as any) || 'europe'
      const categoryLabel = (formData.get('categoryLabel') as string) || 'Alps & Europe'
      const aspect = (formData.get('aspect') as any) || 'standard'
      const description = (formData.get('description') as string) || ''
      const packageSlug = (formData.get('packageSlug') as string) || undefined

      if (!file) {
        return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
      }

      // Save and commit image
      const uploadRes = await saveUploadedImage('public/images/gallery', file, 'admin(gallery): upload image')

      newItem = {
        id: `gallery-${Date.now()}`,
        title: title || file.name.replace(/\.[^/.]+$/, ''),
        location: location || 'Curated Location',
        category,
        categoryLabel,
        image: uploadRes.publicUrl,
        aspect,
        description,
        packageSlug,
      }
    } else {
      const body = await req.json()
      if (!body.image || !body.title) {
        return NextResponse.json({ error: 'Image URL and Title are required' }, { status: 400 })
      }
      newItem = {
        id: body.id || `gallery-${Date.now()}`,
        title: body.title,
        location: body.location || 'Curated Location',
        category: body.category || 'europe',
        categoryLabel: body.categoryLabel || 'Alps & Europe',
        image: body.image,
        aspect: body.aspect || 'standard',
        description: body.description || '',
        packageSlug: body.packageSlug,
      }
    }

    const currentList = await readJsonData<GalleryItem[]>(FILE_PATH, defaultGallery as GalleryItem[])
    const updatedList = [newItem, ...currentList]

    await saveJsonData(FILE_PATH, updatedList, `admin(gallery): add photograph ${newItem.title}`)
    return NextResponse.json({ success: true, item: newItem })
  } catch (error) {
    console.error('Error adding gallery item:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add gallery item' },
      { status: 500 }
    )
  }
}

// PUT: Update gallery item
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: GalleryItem = await req.json()
    if (!body.id) {
      return NextResponse.json({ error: 'Gallery item ID is required' }, { status: 400 })
    }

    const currentList = await readJsonData<GalleryItem[]>(FILE_PATH, defaultGallery as GalleryItem[])
    const index = currentList.findIndex((g) => g.id === body.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }

    currentList[index] = { ...currentList[index], ...body }
    await saveJsonData(FILE_PATH, currentList, `admin(gallery): update photograph ${currentList[index].title}`)

    return NextResponse.json({ success: true, item: currentList[index] })
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

// DELETE: Delete gallery item by id
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Gallery item ID is required' }, { status: 400 })
    }

    const currentList = await readJsonData<GalleryItem[]>(FILE_PATH, defaultGallery as GalleryItem[])
    const filteredList = currentList.filter((g) => g.id !== id)

    if (filteredList.length === currentList.length) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }

    await saveJsonData(FILE_PATH, filteredList, `admin(gallery): delete photograph ${id}`)
    return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}
