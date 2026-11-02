import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { readJsonData, saveJsonData } from '@/lib/github'
import defaultReviews from '@/data/reviews.json'

const FILE_PATH = 'src/data/reviews.json'

export interface ReviewItem {
  id: string
  author: string
  journey: string
  rating: number
  quote: string
  location?: string
  date?: string
  verified?: boolean
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

// GET all reviews
export async function GET() {
  try {
    const reviews = await readJsonData<ReviewItem[]>(FILE_PATH, defaultReviews as ReviewItem[])
    return NextResponse.json({ items: reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST: Add new review
export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: ReviewItem = await req.json()
    if (!body.author || !body.quote) {
      return NextResponse.json({ error: 'Author and Review quote are required' }, { status: 400 })
    }

    const currentList = await readJsonData<ReviewItem[]>(FILE_PATH, defaultReviews as ReviewItem[])
    const newReview: ReviewItem = {
      id: body.id || `review-${Date.now()}`,
      author: body.author.trim(),
      journey: body.journey?.trim() || 'Curated Journey',
      rating: body.rating || 5,
      quote: body.quote.trim(),
      location: body.location?.trim() || 'Verified Client',
      date: body.date?.trim() || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      verified: body.verified !== false,
    }

    const updatedList = [newReview, ...currentList]
    await saveJsonData(FILE_PATH, updatedList, `admin(reviews): add review by ${newReview.author}`)

    return NextResponse.json({ success: true, item: newReview })
  } catch (error) {
    console.error('Error adding review:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add review' },
      { status: 500 }
    )
  }
}

// PUT: Update existing review
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: ReviewItem = await req.json()
    if (!body.id) {
      return NextResponse.json({ error: 'Review ID is required for update' }, { status: 400 })
    }

    const currentList = await readJsonData<ReviewItem[]>(FILE_PATH, defaultReviews as ReviewItem[])
    const index = currentList.findIndex((r) => r.id === body.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    currentList[index] = { ...currentList[index], ...body }
    await saveJsonData(FILE_PATH, currentList, `admin(reviews): update review by ${currentList[index].author}`)

    return NextResponse.json({ success: true, item: currentList[index] })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE: Delete review by ID
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 })
    }

    const currentList = await readJsonData<ReviewItem[]>(FILE_PATH, defaultReviews as ReviewItem[])
    const filteredList = currentList.filter((r) => r.id !== id)

    if (filteredList.length === currentList.length) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    await saveJsonData(FILE_PATH, filteredList, `admin(reviews): delete review ${id}`)
    return NextResponse.json({ success: true, message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete review' },
      { status: 500 }
    )
  }
}
