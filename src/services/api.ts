import { config } from "../config";
import type { ApiError, HttpMethod } from "../types/api";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem(config.tokenKey);
  }

  private getHeaders(includeAuth = true): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(
    response: Response,
    includeAuth = true,
  ): Promise<T> {
    if (response.status === 401 && includeAuth) {
      localStorage.removeItem(config.tokenKey);
      localStorage.removeItem(config.userKey);
      window.location.href = "/login";
      throw new Error("Não autorizado. Faça login novamente.");
    }

    if (!response.ok) {
      let errorMessage = "Erro ao processar requisição";

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = `Erro ${response.status}: ${response.statusText}`;
      }

      const error: ApiError = {
        message: errorMessage,
        status: response.status,
      };

      throw error;
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async request<T>(
    endpoint: string,
    method: HttpMethod = "GET",
    body?: unknown,
    includeAuth = true,
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = this.getHeaders(includeAuth);

      const options: RequestInit = {
        method,
        headers,
      };

      if (body && (method === "POST" || method === "PATCH")) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      return this.handleResponse<T>(response, includeAuth);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro de conexão. Verifique sua internet.");
    }
  }

  async get<T>(endpoint: string, includeAuth = true): Promise<T> {
    return this.request<T>(endpoint, "GET", undefined, includeAuth);
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    includeAuth = true,
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", body, includeAuth);
  }

  async patch<T>(
    endpoint: string,
    body: unknown,
    includeAuth = true,
  ): Promise<T> {
    return this.request<T>(endpoint, "PATCH", body, includeAuth);
  }

  async delete<T>(endpoint: string, includeAuth = true): Promise<T> {
    return this.request<T>(endpoint, "DELETE", undefined, includeAuth);
  }
}

export const apiClient = new ApiClient(config.apiBaseUrl);
