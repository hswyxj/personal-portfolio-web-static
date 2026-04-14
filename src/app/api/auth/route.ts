// src/app/api/auth/route.ts
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: Request) {
  const ip = getClientIp(request);

  // 速率限制: 5次/15分钟
  if (!checkRateLimit(`auth:${ip}`, 5, 15 * 60 * 1000)) {
    return errorResponse('RATE_LIMITED', 'Too many login attempts, please try again later', 429);
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse('VALIDATION_ERROR', 'Email and password are required');
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return errorResponse('AUTH_FAILED', error.message, 401);
    }

    return successResponse({
      user: { id: data.user.id, email: data.user.email }
    });
  } catch (e) {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}

export async function DELETE() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return successResponse({ message: 'Logged out successfully' });
}