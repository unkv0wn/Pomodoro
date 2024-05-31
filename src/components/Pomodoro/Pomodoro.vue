  <template>
    <div class="flex flex-col items-center">
      <div class="flex gap-2 justify-around text-black mt-3">
        <Button :disabled="disabled" class="bg-green-400 py-1 px-3" @click="setTimer(1500)" label="25 Min" icon="pi pi-book" ></Button>
        <Button :disabled="disabled" class="bg-yellow-500 py-1 px-3" @click="setTimer(300)" label="5 min" icon="pi pi-pause" ></Button>
        <Button :disabled="disabled" class="bg-red-500 py-1 px-3"  @click="setTimer(900)" label="15 Min" icon="pi pi-stopwatch"></Button>
      </div>
      <div class="mt-32 text-white text-8xl">
        <h1 class="font-mono">{{ formattedTime }}</h1>
      </div>
      <div class="flex gap-2 text-black mt-28">
        <Button  v-show="ShowAnyVar" class="bg-yellow-400 py-1 px-2" @click="PauseTimer" label="Pausar" icon="pi pi-pause-circle" ></Button>
        <Button v-show="ShowStart" class="bg-green-400 py-1 px-2" @click="StartTimer" label="Iniciar" icon="pi pi-play-circle"></Button>
        <Button v-show="ShowAnyVar" class="bg-red-400 py-1 px-2" @click="ResetTimer" label="Reiniciar" icon="pi pi-refresh"></Button>
      </div>
    </div>
  </template>

  <script setup>
    // [!] Imports 
    import Button from 'primevue/button';
    import { onMounted, ref } from 'vue';
    
    // [+] Value assignments and statements
    let ValueTimer = ref(1500)
    let formattedTime = ref('');
    let ShowStart = true;
    let ShowAnyVar = false;
    let disabled = ref(false);
    let pause = ref(false);
    let intervalID = null;
    let InitialValue = ref(0);

    // [ # ] Define values in seconds
    function setTimer(ValueSecond){
      ValueTimer = ValueSecond;
      InitialValue = ValueSecond;
      formattedTime.value = ConverterSecondInMin(ValueTimer);
      console.log(formattedTime.value)
    }
    // [ # ] Define Initial Value (25:00)
    onMounted(() => {
      setTimer(ValueTimer.value) // [ ! ] This Function mount the timer in initial value
    })

    // [ # ] Create Function to convert seconds in minutes
    function ConverterSecondInMin(ValueTimer) {
      let Minutes = Math.floor(ValueTimer / 60);
      let Seconds = ValueTimer % 60;
      return `${Minutes}:${Seconds < 10 ? '0' : ''}${Seconds}`
    }

    // [ # ] Create Function to Pause Timer
    function PauseTimer() {
      pause.value = !pause.value
    }

    // [ # ] Create Function to Start timer
    function StartTimer() {
      // [ ! ] Validation to case user press start with timer stay 0.
      if (ValueTimer <= 0) {
        setTimer(InitialValue)
      }
      ShowStart = !ShowStart
      ShowAnyVar = !ShowAnyVar
      disabled.value = !disabled.value
      intervalID =  setInterval(() => {
        if(!pause.value) {
          ValueTimer -= 1;
          formattedTime.value = ConverterSecondInMin(ValueTimer)
          if (ValueTimer <= 0) { 
            clearInterval(intervalID);
            AlarmSound() // Working in the Best Solution For this function
            ShowStart = !ShowStart
            ShowAnyVar = !ShowAnyVar 
            disabled.value = !disabled.value
            pause.value = false
          }
        }
        }, 1000);
    }

    // [ # ] Reset timer 
    function ResetTimer() {
    clearInterval(intervalID);
    stop();  // [ ! ] Case user press reset with timer running, process was stop. native javascript function
    setTimer(InitialValue);
    disabled.value = !disabled.value
    ShowStart = !ShowStart
    ShowAnyVar = !ShowAnyVar
    pause.value = false;

  }

  function AlarmSound() {
    if (window.Audio) {
      let audio = new Audio('https://www.soundjay.com/buttons/sounds/button-6.mp3');
      audio.play();
    } else {
      console.error('Seu navegador não suporta a reprodução de áudio.');
    }
  }
  </script>
