export function buildSearchParams(search) {
  const searchParams = new URLSearchParams(search);

  return searchParams.toString();
}
