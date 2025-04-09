import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const jsonPlaceholderApi = {
  async getPosts(): Promise<Post[]> {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  },

  async getPost(id: number): Promise<Post> {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  },

  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    return response.data;
  }
}; 