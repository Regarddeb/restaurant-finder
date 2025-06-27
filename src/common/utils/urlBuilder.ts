export function buildUrl(
  baseUrl: string,
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  let url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}
