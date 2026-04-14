// src/lib/api-response.ts

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export function successResponse<T>(data: T, status: number = 200): Response {
  return Response.json({ success: true, data } as ApiResponse<T>, { status });
}

export function errorResponse(code: string, message: string, status: number = 400): Response {
  return Response.json({ success: false, error: { code, message } } as ApiResponse, { status });
}

export function unauthorizedResponse(): Response {
  return errorResponse('UNAUTHORIZED', 'Authentication required', 401);
}

export function notFoundResponse(message: string = 'Resource not found'): Response {
  return errorResponse('NOT_FOUND', message, 404);
}