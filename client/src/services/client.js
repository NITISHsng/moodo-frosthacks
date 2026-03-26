/**
 * API Client - Centralized HTTP client with interceptors
 * Handles authentication, error handling, and request/response transformation
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem("accessToken");
  }

  /**
   * Set authentication token
   */
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }

  /**
   * Get authentication token
   */
  getToken() {
    return this.token;
  }

  /**
   * Clear authentication
   */
  clearAuth() {
    this.token = null;
    localStorage.removeItem("accessToken");
  }

  /**
   * Build headers with authentication
   */
  getHeaders(isFormData = false) {
    const headers = {};

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Make HTTP request
   */
  async request(endpoint, options = {}) {
    const {
      method = "GET",
      body = null,
      isFormData = false,
      ...otherOptions
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    const headers = this.getHeaders(isFormData);

    const config = {
      method,
      headers,
      ...otherOptions,
    };

    if (body) {
      config.body = isFormData ? body : JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);

      // Handle 401 - Unauthorized
      if (response.status === 401) {
        this.clearAuth();
        window.dispatchEvent(new Event("unauthorized"));
      }

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || "API request failed");
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * GET request
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { method: "GET", ...options });
  }

  /**
   * POST request
   */
  post(endpoint, body, options = {}) {
    return this.request(endpoint, { method: "POST", body, ...options });
  }

  /**
   * PUT request
   */
  put(endpoint, body, options = {}) {
    return this.request(endpoint, { method: "PUT", body, ...options });
  }

  /**
   * DELETE request
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: "DELETE", ...options });
  }

  /**
   * POST FormData (for file uploads)
   */
  postFormData(endpoint, formData, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: formData,
      isFormData: true,
      ...options,
    });
  }
}

export const apiClient = new APIClient();
