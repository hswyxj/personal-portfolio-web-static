// src/app/api/projects/route.ts
import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const profileId = searchParams.get('profileId');
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  // 防止过大的分页请求
  const actualLimit = Math.min(limit, 100);
  const actualOffset = Math.max(offset, 0);

  const supabase = await createClient();

  // 优化: 只选择必要的列，避免 select(*)
  let query = supabase
    .from('projects')
    .select('id, title, description, category, image_url, project_url, featured, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(actualOffset, actualOffset + actualLimit - 1);

  if (profileId) {
    query = query.eq('profile_id', profileId);
  }

  if (category && category !== '全部') {
    query = query.eq('category', category);
  }

  if (featured === 'true') {
    query = query.eq('featured', true);
  }

  const { data, error, count } = await query;

  if (error) {
    return errorResponse('DB_ERROR', 'Failed to fetch projects');
  }

  return successResponse({
    projects: data || [],
    pagination: {
      total: count || 0,
      offset: actualOffset,
      limit: actualLimit,
      hasMore: (actualOffset + actualLimit) < (count || 0)
    }
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();

    // 简单手动校验
    const { title, description, category, image_url, project_url } = body;

    if (!title || !category || !image_url) {
      return errorResponse('VALIDATION_ERROR', 'Title, category, and image_url are required');
    }

    const { data, error } = await supabase
      .from('projects')
      // @ts-expect-error Supabase类型兼容性问题
      .insert({
        title,
        description: description || '',
        category,
        image_url,
        project_url: project_url || null,
      })
      .select()
      .single();

    if (error) {
      return errorResponse('DB_ERROR', 'Failed to create project');
    }

    return successResponse(data, 201);
  } catch (e) {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}