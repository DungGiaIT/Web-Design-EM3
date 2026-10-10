import { forwardProductRequest } from '../../../../lib/api';

export async function PUT(request, { params }) {
  const { id } = await params;
  return forwardProductRequest(request, `/api/products/${encodeURIComponent(id)}`);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  return forwardProductRequest(request, `/api/products/${encodeURIComponent(id)}`);
}
