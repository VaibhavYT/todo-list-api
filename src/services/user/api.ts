import axios, { AxiosInstance,AxiosResponse } from 'axios';

export interface UserSignup {
    name: string;
    email: string;
    password: string;
    }
export interface UserLogin {
    email: string;
    password: string;
    }


// Interface for login response data
export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name?: string;
        // Add other user properties if needed
    };
}

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/user',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});


export const createUser = async (userData: UserSignup): Promise<UserSignup> => {
    try {
        const response: AxiosResponse<UserSignup> = await apiClient.post('/create', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}
export const loginUser = async (userData: UserLogin): Promise<LoginResponse> => {
    try {
        const response: AxiosResponse<LoginResponse> = await apiClient.post(
          "/login",
          userData
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}