import { verify } from "jsonwebtoken";

export const APP_SECRET = `${process.env.APP_SECRET}`;

export interface AuthTokenPayload {
  userId: number;
}

/**
 * Decodifica el JWT
 * @param authHeader JWT token client
 * @returns User id number
 */
export function decodeAuthHeader(authHeader: String): AuthTokenPayload { // 2
  const token = authHeader.replace("Bearer ", "");  // 3

  if (!token) {
      throw new Error("No token found");
  }
  return verify(token, APP_SECRET) as AuthTokenPayload;  // 4
}
