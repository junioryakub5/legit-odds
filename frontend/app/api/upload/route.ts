import { NextRequest, NextResponse } from 'next/server';

// Force Node.js runtime (not edge) so we have full fetch + Buffer support
export const runtime = 'nodejs';
// Allow up to 60 s for large image uploads
export const maxDuration = 60;

const VPS_UPLOAD_URL = 'http://72.60.23.133:5007/api/upload';

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Preserve the full Content-Type header (includes multipart boundary)
    const contentType = request.headers.get('content-type') || '';

    // Buffer the body — more compatible than streaming across Node.js versions
    const bodyBuffer = Buffer.from(await request.arrayBuffer());

    console.log(`[upload proxy] content-type: ${contentType}, size: ${bodyBuffer.length}`);

    const vpsResponse = await fetch(VPS_UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': contentType,
      },
      body: bodyBuffer,
    });

    const text = await vpsResponse.text();
    console.log(`[upload proxy] vps status: ${vpsResponse.status}, body: ${text}`);

    let data: unknown;
    try { data = JSON.parse(text); } catch { data = { error: text }; }

    return NextResponse.json(data, { status: vpsResponse.status });
  } catch (err) {
    console.error('[upload proxy] error:', err);
    return NextResponse.json({ error: 'Upload failed', detail: String(err) }, { status: 500 });
  }
}
