<template>
    <div class="bg-gradient-to-bl from-zinc-950 to-gray-800">
        <div class="grid grid-cols-2 h-screen ">
        <div class=" flex justify-center items-center">
            <div class="grid grid-cols-1 w-11/12 h-5/6	">
                    <div class="">
                       <Pomodoro />
                    </div>
            </div>
        </div>
        <div class=" flex justify-center items-center">         
                <div class="grid grid-cols-1 w-11/12 h-5/6	">
                    <div class="">
                       <TaskList />
                    </div>
                </div>
        </div>
    </div>
    </div>

</template>

<script setup>
    import TaskList from '../TaskList/TaskList.vue';
    import Pomodoro from '../Pomodoro/Pomodoro.vue';
</script>