import { API_BASE_URL } from '../constants/config';
import { tokenStorage } from '../storage/tokenStorage';

export type ApiRequestOptions = {
  method?: string;
  body?: unknown;
  form?: FormData;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Owns URL, auth-header, serialization, and response handling for API calls. */
export class ApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly getToken: () => Promise<string | null>,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const token = await this.getToken();
    const headers: Record<string, string> = { ...options.headers };
    if (token) headers.Authorization = `Bearer ${token}`;

    const body = options.form ?? (options.body === undefined ? undefined : JSON.stringify(options.body));
    if (!options.form && body !== undefined && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await this.fetcher(`${this.baseUrl.replace(/\/$/, '')}${path}`, {
      method: options.method ?? (body === undefined ? 'GET' : 'POST'),
      headers,
      body,
      signal: options.signal,
    });

    const responseText = response.status === 204 ? '' : await response.text();
    if (!response.ok) {
      throw new ApiError(responseText || `HTTP ${response.status}`, response.status);
    }
    if (!responseText) return undefined as T;

    try {
      return JSON.parse(responseText) as T;
    } catch {
      return responseText as T;
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL, tokenStorage.get);

// Keep the existing service facade API while routing calls through one client.
export const api = <T = unknown>(path: string, options?: ApiRequestOptions) =>
  apiClient.request<T>(path, options);
