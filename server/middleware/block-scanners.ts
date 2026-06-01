import { defineEventHandler, setResponseStatus } from 'h3'

// Only allow these paths to reach Vue Router
// Everything else gets an immediate 404

// Valid Nuxt static asset prefixes (from public/ dir and _nuxt builds)
const VALID_ASSET_PREFIXES = [
  '/_nuxt/',       // Nuxt JS/CSS bundles
  '/css/',         // public/css/
  '/docs/',        // public/docs/
  '/flag/',        // public/flag/
  '/tinymce/',     // public/tinymce/
]

// Valid root-level static files
const VALID_ROOT_FILES = [
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
]

export default defineEventHandler((event) => {
  const url = event.path.split('?')[0]

  // 1. Always allow valid page routes (no file extension, or known routes)
  //    /, /admin/login, /pages/1/2, /news/5, /article/xxx, /legal, etc.
  //    These have no dots in the last path segment
  const lastSegment = url.split('/').pop() || ''
  const hasExtension = lastSegment.includes('.')

  if (!hasExtension) {
    // No file extension = page route, let it through to Vue Router
    return
  }

  // 2. Allow known static asset paths
  for (const prefix of VALID_ASSET_PREFIXES) {
    if (url.startsWith(prefix)) return
  }

  for (const file of VALID_ROOT_FILES) {
    if (url === file) return
  }

  // 3. Everything else with a file extension (.php, .js, .css, .py, .env, etc.)
  //    is a bot/scanner probe — block it immediately
  setResponseStatus(event, 404)
  return 'Not Found'
})
