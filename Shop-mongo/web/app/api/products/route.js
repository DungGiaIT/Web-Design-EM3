import { forwardProductRequest } from '../../../lib/api';

export async function POST(request) {
  return forwardProductRequest(request, '/api/products');
}
