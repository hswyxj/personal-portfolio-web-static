// src/app/api/projects/[id]/route.ts
import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-response';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  // 优化: 只选择必要的列，避免 select(*)
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, description, category, image_url, project_url, featured, created_at, updated_at')
    .eq('id', id)
    .single();

  if (error || !data) {
    return notFoundResponse();
  }

  return successResponse(data);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();

    const allowedFields = ['title', 'description', 'category', 'image_url', 'project_url', 'featured'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // 优化: 只选择必要的列
    const { data, error } = await supabase
      .from('projects')
      // @ts-expect-error Supabase类型兼容性问题
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id, title, description, category, image_url, project_url, featured, created_at, updated_at')
      .single();

    if (error) {
      return errorResponse('DB_ERROR', 'Failed to update project');
    }

    return successResponse(data);
  } catch (e) {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    return errorResponse('DB_ERROR', 'Failed to delete project');
  }

  return successResponse({ message: 'Project deleted' });
}