<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Vue Demo App</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TaskManager />
        <PostsList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskManager from './components/TaskManager.vue'
import PostsList from './components/PostsList.vue'
</script> 