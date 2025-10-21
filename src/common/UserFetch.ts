import { getToken } from "./UserStorage";

export async function defaultHeaders() {
  const token = await getToken();
  const headers = new Headers({
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json",
  });

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}
