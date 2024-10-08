<script setup lang="ts">
import { type Sweep } from '../types/Sweep'
import { computed, ref } from 'vue'
import { Button } from '../types/Button'

interface Props {
  sweep?: Sweep
  changeOnClick?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<(event: 'update:sweepValue', value: number) => void>()

// use props.sweep.max and props.sweep.min to calculate the percent
const percent = computed(() =>
  props.sweep?.value && props.sweep?.value > -1 ? (props.sweep.value - props.sweep.min) / (props.sweep.max - props.sweep.min) * 100 : null
)

const percentStyle = computed(() => `height: ${percent.value || 0}%;`)

const sweepClasses = computed(() => {
  return {
    'bg-gray-800': props.sweep === undefined
  }
})

const sweepButton = ref<HTMLButtonElement | null>(null)
const mouseDown = ref(false)

const handleSweepClick = (event: PointerEvent) => {
  if (props.changeOnClick && props.sweep && mouseDown.value) {
    const tolerance = 5
    const height = sweepButton.value?.offsetHeight - tolerance * 2 || 0
    const offset = event.layerY - tolerance
    const percentValue = Math.max(Math.min((height - offset) / height, 1), 0)
    const value = percentValue * (props.sweep?.max - props.sweep?.min) + props.sweep?.min
    emit('update:sweepValue', value)
  }
}

function handleMouseDown (event: PointerEvent) {
  mouseDown.value = true
  handleSweepClick(event)
}
</script>

<template>
    <button
            class="text-white
             flex
             flex-col-reverse
             w-32
             relative
             focus:outline-none
             focus:ring-4
             focus:ring-gray-300
             font-medium
             rounded-lg
             text-sm
             mr-2
             mb-2
             dark:focus:ring-gray-700
             dark:border-gray-700
             bg-gray-700"
            :class="sweepClasses"
            ref="sweepButton"
            @mousedown="handleMouseDown"
            @mouseup="mouseDown = false"
            @mousemove="handleSweepClick"
    >
        <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center h-full">
            <div class="text-xs text-gray-100">{{ props.sweep?.name }}<br>CT:{{props.sweep?.controller}} CH:{{props.sweep?.channel}} </div>
            <div class="text-xs text-gray-100">{{ percent !== null ? `${percent.toFixed(0)}%` : '' }}</div>
        </div>
        <div v-if="sweep" class="bg-cyan-800 from-indigo-500 via-purple-500 to-pink-500 w-full rounded-lg px-5"
             :style="percentStyle">

            <template v-if="$slots.default">
                <slot/>
            </template>
        </div>

    </button>
</template>

<style scoped>

</style>
