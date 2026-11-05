export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Please enter your email address.";
  if (!EMAIL_RE.test(value.trim())) return "Please enter a valid email address, e.g. name@example.com.";
  return undefined;
}

export function required(value: string, label: string): string | undefined {
  return value.trim() ? undefined : `${label} is required.`;
}

/** Mock delay so forms feel like they talk to a server (no network call is made). */
export function fakeRequest<T>(result: T, ms = 900): Promise<T> {
  return new Promise((resolve) => window.setTimeout(() => resolve(result), ms));
}
