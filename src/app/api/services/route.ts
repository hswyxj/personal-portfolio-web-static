// src/app/api/services/route.ts
import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get('profileId');
  const supabase = await createClient() as any;

  // 优化: 只选择必要的列，避免 select(*)
  let query = supabase
    .from('services')
    .select('id, title, description, icon_url, order, created_at')
    .order('order', { ascending: true });

  if (profileId) {
    query = query.eq('profile_id', profileId);
  }

  const { data, error } = await query;

  if (error) {
    return errorResponse('DB_ERROR', 'Failed to fetch services');
  }

  return successResponse({ services: data || [] });
}

export async function POST(request: Request) {
  const supabase = await createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const { title, description, icon_url, order } = body;

    if (!title || !description) {
      return errorResponse('VALIDATION_ERROR', 'Title and description are required');
    }

    // 优化: 只选择必要的列
    const { data, error } = await supabase
      .from('services')
      .insert({ title, description, icon_url: icon_url || null, order: order ?? 0 })
      .select('id, title, description, icon_url, order, created_at')
      .single();

    if (error) {
      return errorResponse('DB_ERROR', 'Failed to create service');
    }

    return successResponse(data, 201);
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}
