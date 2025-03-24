import axios from "axios";

// Define the API base URL from environment variables or fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Create an Axios instance with default settings
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: Infinity, // Set a timeout (10 seconds)
});

export default apiClient;