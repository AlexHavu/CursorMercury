<template>
  <div class="task-manager">
    <h1>Task Manager</h1>
    
    <div class="add-task-form">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        type="text"
        placeholder="Add a new task..."
      />
      <button @click="addTask">Add Task</button>
    </div>

    <div class="task-list">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-item"
      >
        <span 
          :class="{ completed: task.completed }"
          class="task-text"
          @click="toggleTask(task)"
        >
          {{ task.text }}
        </span>
        <div class="task-actions">
          <button 
            class="complete-btn"
            @click="toggleTask(task)"
          >
            {{ task.completed ? 'Undo' : 'Complete' }}
          </button>
          <button 
            class="delete-btn"
            @click="removeTask(task.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div class="stats">
      <p>Completed: {{ completedTasks }} / {{ tasks.length }}</p>
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

<style scoped>
.task-manager {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Weird styles */
.task-list {
  margin-top: 2rem;
  transform: rotate(2deg);
  background-color: #ffeb3b;
  padding: 1rem;
  border: 3px dashed #ff5722;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #e91e63;
  color: white;
  border-radius: 0.5rem;
  transform: skew(-5deg);
  transition: all 0.3s ease;
}

.task-item:hover {
  transform: skew(5deg) scale(1.05);
  background-color: #c2185b;
}

.task-text {
  flex: 1;
  margin-right: 1rem;
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.2rem;
  text-decoration: underline wavy;
}

.completed {
  text-decoration: line-through;
  color: #9e9e9e;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.1) rotate(5deg);
}

.complete-btn {
  background-color: #4caf50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #2196f3;
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: #e3f2fd;
  transform: skew(-2deg);
}

input[type="text"]:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 5px #2196f3;
  transform: skew(2deg);
}

.add-task-form {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #b3e5fc;
  border-radius: 0.5rem;
  transform: rotate(-1deg);
}

.stats {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #ff9800;
  color: white;
  border-radius: 0.5rem;
  text-align: center;
  transform: rotate(1deg);
  font-family: 'Impact', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style> 