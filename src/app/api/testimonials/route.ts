// src/app/api/testimonials/route.ts
import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get('profileId');
  const supabase = await createClient() as any;

  // 优化: 只选择必要的列，避免 select(*)
  let query = supabase
    .from('testimonials')
    .select('id, name, role, quote, avatar_url, order, created_at')
    .order('order', { ascending: true });

  if (profileId) {
    query = query.eq('profile_id', profileId);
  }

  const { data, error } = await query;

  if (error) {
    return errorResponse('DB_ERROR', 'Failed to fetch testimonials');
  }

  return successResponse({ testimonials: data || [] });
}

export async function POST(request: Request) {
  const supabase = await createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const { name, role, quote, avatar_url, order } = body;

    if (!name || !quote) {
      return errorResponse('VALIDATION_ERROR', 'Name and quote are required');
    }

    // 优化: 只选择必要的列
    const { data, error } = await supabase
      .from('testimonials')
      .insert({ name, role: role || '', quote, avatar_url: avatar_url || '', order: order ?? 0 })
      .select('id, name, role, quote, avatar_url, order, created_at')
      .single();

    if (error) {
      return errorResponse('DB_ERROR', 'Failed to create testimonial');
    }

    return successResponse(data, 201);
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}
