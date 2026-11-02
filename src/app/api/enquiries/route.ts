import { NextResponse } from 'next/server'
import { readJsonData, saveJsonData } from '@/lib/github'
import defaultEnquiries from '@/data/enquiries.json'
import type { Enquiry } from '@/types/enquiry'

const FILE_PATH = 'src/data/enquiries.json'

// Public POST endpoint to record a new client enquiry
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, destination, packageSlug, adults, children, preferredDate, message } = body

    if (!name || !phone || !destination) {
      return NextResponse.json(
        { error: 'Name, phone number, and destination are required fields.' },
        { status: 400 }
      )
    }

    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      destination: String(destination).trim(),
      packageSlug: packageSlug ? String(packageSlug).trim() : undefined,
      adults: adults ? String(adults) : '2',
      children: children ? String(children) : '0',
      preferredDate: preferredDate ? String(preferredDate) : '',
      message: message ? String(message).trim() : undefined,
      status: 'pending',
    }

    const currentList = await readJsonData<Enquiry[]>(FILE_PATH, defaultEnquiries as Enquiry[])
    const updatedList = [newEnquiry, ...currentList]

    // Save locally and commit to GitHub repository
    await saveJsonData(
      FILE_PATH,
      updatedList,
      `enquiry: new client ${newEnquiry.name} for ${newEnquiry.destination}`
    )

    return NextResponse.json(
      {
        success: true,
        enquiry: newEnquiry,
        id: newEnquiry.id,
        message: 'Your enquiry has been successfully recorded.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[ENQUIRY SUBMISSION ERROR]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to record enquiry' },
      { status: 500 }
    )
  }
}
