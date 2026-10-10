import { apiBase } from '../../../lib/api';

export async function GET(_request, { params }) {
  const { name } = await params;
  try {
    const response = await fetch(`${apiBase}/uploads/${encodeURIComponent(name)}`);
    if (!response.ok) return new Response('Không tìm thấy ảnh', { status: response.status });
    return new Response(response.body, {
      headers: {
        'content-type': response.headers.get('content-type') || 'application/octet-stream',
        'cache-control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('Không kết nối được API', { status: 502 });
  }
}
