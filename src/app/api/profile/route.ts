// src/app/api/profile/route.ts
import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-response';

const PROFILE_EMAIL = 'h19111426051@163.com';

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const query = supabase
    .from('profiles')
    .select('id, user_id, name, profession, wechat, email, bio, skills, hero_intro')
    

  const { data, error } = user
    ? await query.eq('user_id', user.id).single()
    : await query.eq('email', PROFILE_EMAIL).single()

  if (error || !data) {
    return notFoundResponse('Profile not found');
  }

  return successResponse(data);
}

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();

    // 简单手动校验
    const { name, profession, wechat, email, bio, skills, hero_intro } = body;

    // 优化: 直接更新，不需要先查询 ID（合并为单次数据库往返）
    const { data, error } = await supabase
      .from('profiles')
      // @ts-expect-error Supabase类型兼容性问题
      .update({ name, profession, wechat, email, bio, skills, hero_intro, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .select('id, user_id, name, profession, wechat, email, bio, skills, hero_intro, created_at, updated_at')
      .single();

    if (error) {
      return errorResponse('DB_ERROR', 'Failed to update profile');
    }

    return successResponse(data);
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}