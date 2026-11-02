const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hdslcknwkzzejzbgehif.supabase.co'
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc2xja253a3p6ZWp6YmdlaGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMDA4NzgsImV4cCI6MjEwNzg3Njg3OH0.r8sR1mwVMRBjSUZhkEdLNMx1T4nVICrT45Zj6uDzxIk'

async function ping() {
  console.log(`Pinging Supabase at ${SUPABASE_URL}...`)
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
    })
    console.log(`Supabase REST Response: HTTP ${res.status}`)

    const authRes = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      headers: { apikey: ANON_KEY },
    })
    console.log(`Supabase Auth Response: HTTP ${authRes.status}`)

    if (res.ok || authRes.ok) {
      console.log('Keep-alive ping successful! Supabase project is active.')
    }
  } catch (err) {
    console.error('Ping failed:', err)
  }
}

ping()

