export type ApiCallResult<T> = { data: T | null; error: string };

export async function fetchApi<T>(endpoint: string): Promise<ApiCallResult<T>> {
  try {
    const res = await fetch(endpoint, { cache: 'no-store' });
    const json = await res.json();

    if (!res.ok || !json.success) {
      return { data: null, error: json.error?.message || 'Failed to fetch data' };
    }

    return { data: json.data as T, error: '' };
  } catch {
    return { data: null, error: 'Network error' };
  }
}
