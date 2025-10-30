export const tokensLifetime = {
  access: 60 * 15,
  refresh: 3600 * 24 * 7,
} as const satisfies Record<string, number>;
