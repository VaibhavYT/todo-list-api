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
const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/user',
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
export const loginUser = async (userData: UserLogin): Promise<UserLogin> => {
    try {
        const response: AxiosResponse<UserLogin > = await apiClient.post('/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}