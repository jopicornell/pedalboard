<script setup lang="ts">
import { type Button } from '../../@types'

type Emits = (event: 'click', button: Button | undefined) => void

interface Props {
  button?: Button
  isEditing?: boolean
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()

</script>

<template>
  <button
      v-if="!isEditing"
      class="text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-gray-700 dark:border-gray-700"

      :class="{ 'bg-cyan-800 hover:bg-cyan-900': props.button?.enabled, 'bg-gray-700 hover:bg-gray-800': !props.button?.enabled }"
      @click="emit('click', props.button ?? undefined)"
  >{{ props.button?.name }}
    <template v-if="$slots.default">
      <slot/>
    </template>
  </button>
  <div
      @click="emit('click', button)"
      v-else
      class="grid grid-rows-[1fr_auto_1fr] justify-center text-white cursor-pointer bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-gray-700 dark:border-gray-700">
    <span></span>
    <span>{{ props.button?.name }}</span>
    <div>

    </div>
  </div>
</template>

<style scoped>

</style>
