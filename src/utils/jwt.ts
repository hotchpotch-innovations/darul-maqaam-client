import { jwtDecode } from "jwt-decode";

type TResponse = {
  email: string;
  exp: number;
  gu_id: string;
  iat: number;
  role: string;
};

export const decodedToken = (token: string): TResponse | null => {
  if (!token) {
    return null;
  }
  return jwtDecode(token);
};
