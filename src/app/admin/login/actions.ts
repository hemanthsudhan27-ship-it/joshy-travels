'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  let errorMessage: string | null = null

  try {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      errorMessage = 'Please provide both your email address and password.'
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        errorMessage = error.message
      }
    }
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : 'Authentication service error'
  }

  if (errorMessage) {
    redirect(`/admin/login?error=${encodeURIComponent(errorMessage)}`)
  }

  redirect('/admin')
}

export async function logout() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (err) {
    console.error('Logout error:', err)
  }
  redirect('/admin/login')
}

