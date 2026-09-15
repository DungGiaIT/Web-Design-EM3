import { API_BASE_URL } from "../config.js";

export class ApiService{
    constructor(baseUrl = API_BASE_URL){
        this.baseUrl = baseUrl;
    }

    async request(url, options = {}) {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.status === 204 ? null : response.json();
    }

    getAll() {
        return this.request(this.baseUrl);
    }

    getById(id) {
        return this.request(`${this.baseUrl}/${id}`);
    }

    create(productData) {
        return this.request(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    }

    put(id, productData) {
        return this.request(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    }

    delete(id) {
        return this.request(`${this.baseUrl}/${id}`, { method: 'DELETE' });
    }
}