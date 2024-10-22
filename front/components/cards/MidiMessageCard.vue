<script setup lang="ts">
import { type Button, MidiMessage } from '../@types';
import { useVModel } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
  modelValue: MidiMessage
}

interface Emits {
  (event: 'remove', button: Button | undefined): void
}

const props = defineProps<Props>()

const emits = defineEmits()

const message = useVModel(props)


const messageTypes = {
  'CC': 'control-change',
  'PC': 'program-change',
  'NON': 'note-on',
  'NOFF': 'note-off'
}

</script>

<template>
  <div
      v-if="message"
      class="flex flex-row flex-0 gap-4 items-center justify-between px-5 py-3 dark:bg-gray-800 border border-gray-200 rounded shadow-sm"
  >
    <div class="flex flex-row items-center">
      <div class="flex gap-3">
        <div class="w-full">
          <label for="midi-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Channel</label>
          <input
              v-model="message.channel"
              type="number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div class="w-full">
          <label
for="midi-input"
                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Controller</label>
          <input
              v-model="message.controller"
              type="number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div class="w-full">
          <label for="midi-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
          <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="message.type">
            <option v-for="(typeName, type) in messageTypes" :key="typeName" :value="typeName">{{ type }}</option>
          </select>
        </div>
      </div>
    </div>
    <button class="font-semibold text-2xl text-red-300">
      <font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon>
    </button>
  </div>
</template>

<style scoped>

</style>
