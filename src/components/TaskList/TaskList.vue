<script setup>
import { ref } from 'vue'
import Button from 'primevue/button';
import { sendNotification } from '@tauri-apps/api/notification';

let id = 0

const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([]);
const error = ref(false);

function FiltredTodo() {
 return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value
}

function addTodo() {
  if (!/[0-9]/.test(newTodo.value)) {
    todos.value.push({ id: id++, text: newTodo.value, done: false });
    newTodo.value = '';
  } else {
    sendNotification({ title: '🚫 ERROR', body: 'é apenas permitido  Letras e espaços!' });
  }
}

function removeTodo(todo) {
 todos.value = todos.value.filter((t) => t !== todo)
}

function toggleDone(todo){
     todo.done = !todo.done
}
</script>

<template>
 <div class="flex  flex-col">
     <!-- Barra de input -->
   <div class="relative">
        <form @submit.prevent="addTodo">
        <input  v-model="newTodo" required type="text"  class="px-4 py-2 w-full bg-transparent text-white border-none focus:outline-none" placeholder="Adicione um Novo item..." maxlength="50">
        <button class="absolute right-0  px-4 py-2  text-green-400">Adicionar</button>
        </form>
   </div>
   <!-- Itens Task-->
   <div class="flex flex-col">
        <ul class="mt-0.5">
            <li class="text-base  mt-1 w-full flex justify-between ml-3 pr-5" v-for="todo in FiltredTodo()" :key="todo.id">
            <Button icon="pi pi-check" @click="toggleDone(todo)" :class="{ 'text-green-400': todo.done, 'text-white': !todo.done }"></Button>
            <span :class="{ 'text-white opacity-35': todo.done }" class="text-white">
               {{ todo.text }}
            </span>
            <Button icon="pi pi-trash" @click="removeTodo(todo)" class="text-white hover:text-red-500"></Button>
            </li>
        </ul>
   </div>
 </div>
</template>

