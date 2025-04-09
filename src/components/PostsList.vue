<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Posts from JSONPlaceholder</h2>
    
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading posts...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 p-4 rounded-lg">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Posts List -->
    <div v-else class="space-y-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h3>
        <p class="text-gray-600">{{ post.body }}</p>
        <div class="mt-4 text-sm text-gray-500">
          Post ID: {{ post.id }} | User ID: {{ post.userId }}
        </div>
      </div>
    </div>

    <!-- Create Post Form -->
    <div class="mt-8 p-6 bg-white rounded-lg shadow">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Create New Post</h3>
      <form @submit.prevent="createPost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="newPost.title"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            v-model="newPost.body"
            required
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Post
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { jsonPlaceholderApi, Post } from '../services/jsonPlaceholderApi'

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref('')
const newPost = ref({
  title: '',
  body: '',
  userId: 1
})

const loadPosts = async () => {
  try {
    loading.value = true
    error.value = ''
    posts.value = await jsonPlaceholderApi.getPosts()
  } catch (err) {
    error.value = 'Failed to load posts'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const createPost = async () => {
  try {
    const createdPost = await jsonPlaceholderApi.createPost(newPost.value)
    posts.value.unshift(createdPost)
    newPost.value = { title: '', body: '', userId: 1 }
  } catch (err) {
    error.value = 'Failed to create post'
    console.error(err)
  }
}

onMounted(() => {
  loadPosts()
})
</script> 