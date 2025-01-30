export const fetcher = (url: string) => fetch(
  `/api/${url}`
).then(r => r.json());
