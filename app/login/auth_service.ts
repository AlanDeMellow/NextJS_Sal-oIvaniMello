const TOKEN_KEY = "auth_token";
const ROLE_KEY = "auth_role";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function saveRole(role: string) {
  localStorage.setItem(ROLE_KEY, role);
}

export function getToken(): string | null {
  return typeof window !== "undefined"
    ? localStorage.getItem(TOKEN_KEY)
    : null;
}

export function getRole(): string | null {
  return typeof window !== "undefined"
    ? localStorage.getItem(ROLE_KEY)
    : null;
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function isAdmin(): boolean {
  return getRole() === "ADMIN";
}