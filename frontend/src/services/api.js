import axios from "axios";

const API_BASE = "http://localhost:8000/api";

const api = axios.create({
    baseURL: API_BASE,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const workflowApi = {
    plan: (description) =>
        api.post("/workflows/plan", { description, name: null, tags: [] }),

    list: (skip = 0, limit = 10) =>
        api.get("/workflows", { params: { skip, limit } }),

    getStatus: (workflowId) => api.post(`/workflows/${workflowId}/status`),

    deploy: (workflowId) => api.post(`/workflows/${workflowId}/deploy`),

    execute: (workflowId) => api.post(`/workflows/${workflowId}/execute`),
};

export const healthAPI = {
    check: () => api.get("/health"),
};

export default api;
