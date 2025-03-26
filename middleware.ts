import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const response = NextResponse.next()

  // Add security headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' 'nonce-${nonce}' 
      https://vmtmpbkgmmwuzflztxru.supabase.co 
      https://*.google.com https://*.google.com.ng 
      https://*.gstatic.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: 
      https://vmtmpbkgmmwuzflztxru.supabase.co 
      https://picsum.photos 
      https://*.google.com https://*.google.com.ng 
      https://*.gstatic.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' 
      https://vmtmpbkgmmwuzflztxru.supabase.co 
      https://*.google.com https://*.google.com.ng;
    connect-src 'self' 
      https://vmtmpbkgmmwuzflztxru.supabase.co 
      https://*.google.com https://*.google.com.ng 
      https://*.gstatic.com;
    media-src 'self';
    worker-src 'self' blob:;
  `.replace(/\s{2,}/g, ' ').trim()

  // Add the CSP header to the response
  response.headers.set('Content-Security-Policy', cspHeader)

  // Add other security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), speaker-selection=(), conversion-measurement=(), focus-without-user-activation=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), sync-script=(), trust-token-redemption=(), window-placement=(), vertical-scroll=()'
  )

  // Handle cookies
  const requestCookies = request.cookies.getAll()
  requestCookies.forEach(cookie => {
    response.cookies.set({
      name: cookie.name,
      value: cookie.value,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })
  })

  return response
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next/data).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
} 