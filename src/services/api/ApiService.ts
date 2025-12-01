import { defaultHeaders } from "../../common/UserFetch";

export default class ApiService {
  private static async apiRequest(
    url: string,
    requestInit: RequestInit
  ): Promise<{ data: any }> {
    const fullUrl = process.env.EXPO_PUBLIC_API_URL + url;
    console.log("Request:", fullUrl, requestInit);

    try {
      const res = await fetch(fullUrl, requestInit);
      const data = await res.json();

      return {
        data: data,
      };
    } catch (error: any) {
      console.error("API Request Error:", error);
      return {
        data: null,
      };
    }
  }

  static async get(
    url: string,
    params?: Record<string, any>
  ): Promise<{ data: any }> {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";

    const req: RequestInit = {
      method: "GET",
      headers: await defaultHeaders(),
    };

    return this.apiRequest(url + query, req);
  }

  static async post(
    url: string,
    data: Record<string, any>
  ): Promise<{ data: any }> {
    const req: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: await defaultHeaders(),
    };

    return this.apiRequest(url, req);
  }

  static async put(
    url: string,
    data: Record<string, any>
  ): Promise<{ data: any }> {
    const req: RequestInit = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: await defaultHeaders(),
    };

    return this.apiRequest(url, req);
  }

  static async patch(
    url: string,
    data: Record<string, any>
  ): Promise<{ data: any }> {
    const req: RequestInit = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: await defaultHeaders(),
    };

    return this.apiRequest(url, req);
  }

  static async delete(url: string): Promise<{ data: any }> {
    const req: RequestInit = {
      method: "DELETE",
      headers: await defaultHeaders(),
    };

    return this.apiRequest(url, req);
  }
}
