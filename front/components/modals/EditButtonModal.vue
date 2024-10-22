<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button, MidiMessage, MidiMessageType } from '@types/main'
import MidiMessageCard from '@/components/cards/MidiMessageCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Emits {
  (event: 'close'): void
}

const emit = defineEmits<Emits>()

const dialog = ref<HTMLDialogElement | null>(null)

const button = ref<Button | null>(null)

const buttonTypes = ref<Array<Button['type']>>(['effect', 'trigger', 'program'])

const open = async (buttonParam: Button) => {
  button.value = buttonParam
  console.log(buttonParam)
  dialog.value?.showModal()
}

onMounted(() => {
  dialog.value?.addEventListener('click', function (event) {
    if (event.target === dialog.value) {
      dialog.value?.close()
    }
  })
})

const close = () => {
  dialog.value?.close()
  emit('close')
}

interface Expose {
  open: (button: Button) => Promise<void>
  close: () => void
}

defineExpose<Expose>({
  open,
  close
})



function save() {

}

function addOnMessage() {
  if (button.value === null || !('onMessages' in button.value)) {
    return
  }
  button.value.onMessages?.push({
    channel: button.value.channel,
    value: 127,
    controller: button.value.controller,
    type: MidiMessageType.ControlChange
  })
}

function onOnMessageEdit(index: number, message: MidiMessage) {
  if (button.value === null || !('onMessages' in button.value) || button.value.onMessages === undefined) {
    return
  }
  button.value.onMessages[index] = message
}

function addOffMessage() {
  if (button.value === null || !('offMessages' in button.value)) {
    return
  }
  button.value.offMessages?.push({
    channel: button.value.channel,
    value: 127,
    controller: button.value.controller,
    type: MidiMessageType.ControlChange
  })
}

function onOffMessageEdit(index: number, message: MidiMessage) {
  if (button.value === null || !('offMessages' in button.value) || button.value.offMessages === undefined) {
    return
  }
  console.log(button.value.offMessages, message)
  button.value.offMessages[index] = message
}
</script>

<template>
  <dialog ref="dialog" class="w-2/3 h-full overflow-y-hidden backdrop:backdrop-blur-md bg-transparent p-0">
    <div class="config-modal h-full rounded-lg border dark:border-gray-600 shadow-xl bg-transparent" v-if="button">

      <div
          class="flex flex-row justify-between p-6 dark:bg-gray-800 border-b dark:text-gray-100 dark:border-gray-700 rounded-tl-lg rounded-tr-lg"
      >
        <p class="font-semibold">Editing button {{ button.name }}</p>
        <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <div class="grid grid-cols-2 min-h-0 auto-rows-min gap-4 px-6 py-5 dark:bg-gray-900 overflow-y-auto">
        <div class="w-full">
          <label for="midi-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
              v-model="button.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div class="w-full">
          <label for="midi-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
          <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="button.type">
            <option v-for="type in buttonTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div class="w-full" v-if="button.type === 'effect' || button.type === 'trigger'">
          <label
              for="midi-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Controller</label>
          <input
              v-model="button.controller"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>

        <div class="w-full" v-if="button.type === 'effect' || button.type === 'trigger'">
          <label
              for="midi-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Channel</label>
          <input
              v-model="button.channel"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div class="w-full grid auto-rows-min gap-3" v-if="'onMessages' in button && 'offMessages' in button">

          <h2 class="text-lg font-bold">On Messages <button @click="addOnMessage()"><font-awesome-icon icon="fa-solid fa-plus-circle"></font-awesome-icon></button></h2>
          <template v-for="(midiMessage, index) in button.onMessages" :key="midiMessage.id">
          <MidiMessageCard :model-value="midiMessage" @change="onOnMessageEdit(index, midiMessage)"></MidiMessageCard>
          </template>
        </div>
        <div class="w-full grid auto-rows-min gap-3" v-if="'offMessages' in button">

          <h2 class="text-lg font-bold">Off Messages <button @click="addOffMessage()"><font-awesome-icon icon="fa-solid fa-plus-circle"></font-awesome-icon></button></h2>
          <template v-for="(midiMessage, index) in button.offMessages" :key="midiMessage.id">
            <MidiMessageCard :model-value="midiMessage" @change="onOffMessageEdit(index,midiMessage)" ></MidiMessageCard>
          </template>


        </div>

      </div>

      <div
          class="flex flex-row items-center justify-end p-5 dark:bg-gray-800 border-t dark:border-gray-700 rounded-bl-lg rounded-br-lg"
      >
        <button class="px-4 py-2 text-white font-semibold bg-blue-500 rounded" @click="save">
          Save
        </button>
      </div>
    </div>
  </dialog>

</template>

<style scoped>
.config-modal {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
