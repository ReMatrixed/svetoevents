export const baseUrl = "/api";

export const fetcher = (url: string) => fetch(
  `${baseUrl}/${url}`
).then(r => r.json());
