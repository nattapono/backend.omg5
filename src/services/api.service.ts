// services/api.service.ts
import { useUserSession } from '/@src/stores/userSession'

export const AuthService = {
  async post(path: string, body?: any) {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    const url = `${apiBase}${path}`;
    // Fetch options
    const options = {
      method: "POST", // Specify the HTTP method (GET, POST, PUT, DELETE, etc.)
      body: JSON.stringify(body), // Convert the request data to a JSON string
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "mode": 'no-cors',
        "Origin": apiBase
      }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const userSession = useUserSession()
    userSession.setToken('logged-in')
    return data;
  },
  // Add methods for other HTTP verbs as needed
};

export const ApiService = {
  async post(method: any, path: string, body?: any) {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    const url = `${apiBase}${path}`;
    // const token = useCookie("token");
    const authorizationRef = ref(`Bearer ${token.value}`);
    const headers = {
      Authorization: authorizationRef.value,
      "Content-Type": "application/json",

    };
    // Fetch options
    const options = {
      method: (typeof method === 'string' ? method.toUpperCase() : method), // Specify the HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: headers,
      body: JSON.stringify(body), // Convert the request data to a JSON string
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  },
};

export const ImageService = {
  async post(method: any, path: string, body?: any) {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    const url = `${apiBase}${path}`;
    // const token = useCookie("token");
    const authorizationRef = ref(`Bearer ${token.value}`);
    const headers = {
      Authorization: authorizationRef.value,
    };
    // Fetch options
    const options = {
      method, // Specify the HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: headers,
      body: body, // Convert the request data to a JSON string
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  },
};
export const uploadImage=async(body: any) =>{
    try {
      const data = await ImageService.post(
        "POST",  `api/v1/image/upload`,body
      );
      if (data) {
        return data;
      }
    } catch (error) {
      console.error("Error in authenticateUser:", error);
    }
  };
