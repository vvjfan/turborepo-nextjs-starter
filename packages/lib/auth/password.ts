export async function hashPassword(password: string) {
  return password;
}

export function verifyPassword(password: string, hashedPassword: string) {
  return password === hashedPassword;
}
