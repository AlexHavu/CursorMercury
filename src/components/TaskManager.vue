<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>
    
    <!-- Add Task Form -->
    <div class="mb-6">
      <div class="flex gap-2">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          type="text"
          placeholder="Add a new task..."
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="addTask"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
    </div>

    <!-- Task List -->
    <div class="space-y-3">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task)"
            class="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
          />
          <span :class="{ 'line-through text-gray-400': task.completed }">
            {{ task.text }}
          </span>
        </div>
        <button
          @click="removeTask(task.id)"
          class="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="mt-6 text-sm text-gray-500">
      {{ tasks.length }} tasks total, {{ completedTasks }} completed
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { taskApi, Task } from '../services/taskApi'

const tasks = ref<Task[]>([])
const newTask = ref('')

const completedTasks = computed(() => 
  tasks.value.filter(task => task.completed).length
)

const loadTasks = async () => {
  try {
    tasks.value = await taskApi.getAllTasks()
  } catch (error) {
    console.error('Failed to load tasks:', error)
  }
}

const addTask = async () => {
  if (newTask.value.trim()) {
    try {
      const task = await taskApi.createTask(newTask.value.trim())
      tasks.value.push(task)
      newTask.value = ''
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }
}

const toggleTask = async (task: Task) => {
  try {
    const updatedTask = await taskApi.updateTask(task.id, !task.completed)
    const index = tasks.value.findIndex(t => t.id === task.id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  } catch (error) {
    console.error('Failed to update task:', error)
  }
}

const removeTask = async (id: number) => {
  try {
    await taskApi.deleteTask(id)
    tasks.value = tasks.value.filter(task => task.id !== id)
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

onMounted(() => {
  loadTasks()
})
</script> 