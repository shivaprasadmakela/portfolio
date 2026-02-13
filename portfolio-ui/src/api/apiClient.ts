const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.shivaprasadm.in';

export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    // Determine if this is a mutation (POST, PUT, DELETE, PATCH)
    const method = options.method?.toUpperCase() || 'GET';
    const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
    
    const config: RequestInit = {
        ...options,
        // GET requests: allow HTTP caching if backend sends Cache-Control headers
        // Mutations: always bypass cache
        cache: isMutation ? 'no-store' : (options.cache || 'default'),
        credentials: 'include', // Include credentials for CORS
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        let errorMessage = 'An error occurred';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            // Fallback if not JSON
        }
        throw new Error(errorMessage);
    }

    // Health check or other endpoints might return empty
    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}
