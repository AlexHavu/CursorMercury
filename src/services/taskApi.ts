import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const taskApi = {
  async getAllTasks(): Promise<Task[]> {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  },

  async createTask(text: string): Promise<Task> {
    const response = await axios.post(`${API_BASE_URL}/tasks`, { text });
    return response.data;
  },

  async updateTask(id: number, completed: boolean): Promise<Task> {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, { completed });
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  }
}; 