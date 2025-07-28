import { NextRequest, NextResponse } from 'next/server'

function nextRouteHandler(request: NextRequest, { params }: { params: { slug: string[] } }) {
    const method = request.method
    const path = params.slug.join('/')
    const url = request.url
    const timestamp = new Date().toISOString()

    console.log(`[${timestamp}] ${method} /api/imgly/${path}`)
    console.log(`  Full URL: ${url}`)
    console.log(`  Headers:`, Object.fromEntries(request.headers.entries()))

    return NextResponse.json(
        {
            error: 'Not Implemented',
            message: 'This IMG.LY SDK endpoint is not yet implemented',
            details: {
                method,
                path: `/api/imgly/${path}`,
                timestamp
            }
        },
        { status: 501 }
    )
}

type RouteHandlerOptions = {}

function createNextRouteHandler(options: RouteHandlerOptions = {}) {
    return {
        GET: nextRouteHandler,
        POST: nextRouteHandler
    }
}

export { createNextRouteHandler }
