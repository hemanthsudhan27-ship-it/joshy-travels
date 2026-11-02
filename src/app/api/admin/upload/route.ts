import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { saveUploadedImage } from '@/lib/github'

async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const requestedFolder =
      (formData.get('folder') as string) ||
      (formData.get('subfolder') as string) ||
      'uploads'

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    // Ensure folder is within public/images/
    let normalizedFolder = requestedFolder
    if (!normalizedFolder.startsWith('public/images/')) {
      const cleanSub = normalizedFolder.replace(/^public\//, '').replace(/^images\//, '')
      normalizedFolder = `public/images/${cleanSub}`
    }

    const result = await saveUploadedImage(normalizedFolder, file, 'admin: upload media')
    return NextResponse.json({
      success: true,
      url: result.publicUrl,
      publicUrl: result.publicUrl,
      filePath: result.filePath,
      dataUrl: result.dataUrl,
      rawUrl: result.rawUrl,
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Image upload failed' },
      { status: 500 }
    )
  }
}
