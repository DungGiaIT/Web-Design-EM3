export const apiBase = process.env.API_INTERNAL_URL || 'http://localhost:3001';

export async function forwardProductRequest(request, path) {
  try {
    const response = await fetch(`${apiBase}${path}`, {
      method: request.method,
      body: request.method === 'DELETE' ? undefined : await request.formData(),
      cache: 'no-store',
    });
    return new Response(response.body, {
      status: response.status,
      headers: { 'content-type': response.headers.get('content-type') || 'application/json' },
    });
  } catch {
    return Response.json({ message: 'Không kết nối được API' }, { status: 502 });
  }
}
