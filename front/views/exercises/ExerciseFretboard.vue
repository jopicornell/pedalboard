<script setup lang="ts">
import { useMetronome } from '@/composables/useMetronome.ts'
import { ref } from 'vue'

const { emitAfter, beatEmitter, start: startMetronome, stop: stopMetronome } = useMetronome()
const countDown = ref(4)
const beatCountDown = ref(1)
const prev = ref('')
const current = ref('')
const next = ref('')
const notes: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
// const notesWithSharp: string[] = ['A#', 'C#', 'D#', 'F#', 'G#']
// const notesWithFlat: string[] = ['Ab', 'Bb', 'Db', 'Eb', 'Gb']

const notesToShow = ref<string[]>([...notes].toSorted((a, b) => a.localeCompare(b)))

const emiterAfterSix = emitAfter(6, 4)

const started = ref(false)

function removeNote (note: string): void {
  const index = notesToShow.value.indexOf(note)
  if (index > -1) {
    notesToShow.value.splice(index, 1)
  }
}

function getNote (): string {
  const index = Math.floor(Math.random() * notesToShow.value.length)
  const note = notesToShow.value[index]

  removeNote(note)
  if (notesToShow.value.length === 0) {
    notesToShow.value = [...notes]
  }
  return note
}
let first = true
const clickCallback = (): void => {
  if (first) {
    first = false
    return
  }
  first = false
  if (countDown.value > 0) {
    countDown.value--
    return
  }
  if (beatCountDown.value < 6) {
    beatCountDown.value++
  } else {
    beatCountDown.value = 1
  }
}

function start (): void {
  startMetronome()
  started.value = true
  first = true
  next.value = getNote()

  beatEmitter.on('click', clickCallback)
  const emitAfter4 = emitAfter(4)
  const afterCoundownCallback = (): void => {
    emitAfter4.off('click', afterCoundownCallback)
    current.value = next.value
    next.value = getNote()
    emiterAfterSix.on('click', () => {
      prev.value = current.value
      current.value = next.value
      next.value = getNote()
    })
  }
  emitAfter4.on('click', afterCoundownCallback)
}

function stop (): void {
  stopMetronome()
  started.value = false
  prev.value = ''
  current.value = ''
  next.value = ''
  countDown.value = 4
  beatCountDown.value = 1
  beatEmitter.off('click', clickCallback)
  emiterAfterSix.off('click')
}
</script>

<template>
  <div class="flex p-4">
    <div @click="stop" v-if="started && countDown > 0"
         class="absolute top-0 right-0 flex justify-center items-center h-[100vh] w-[100vw] z-10">
      <div class="card bg-neutral w-32  flex justify-center items-center">
        <div class="card-body text-6xl">{{ countDown }}</div>
      </div>
    </div>
    <div class="card bg-neutral self-start shadow-2xl">
      <div class="card-body gap-4">
        <div class="card-title">
          <h2 class="text-2xl">Fretboard</h2>
        </div>
        <div class="flex gap-4 flex-wrap">
          <div class="card bg-accent-content w-16 h-16 sm:w-32 sm:h-32 text-lg sm:text-2xl">
            <div class="card-body p-1 sm:p-4 flex justify-center items-center ">{{ prev }}</div>
          </div>
          <div class="card bg-accent-content w-16 h-16 sm:w-32 sm:h-32 text-lg sm:text-2xl">
            <div class="card-body p-1 sm:p-4 flex justify-center items-center ">{{ current }}</div>
          </div>
          <div class="card bg-accent-content w-16 h-16 sm:w-32 sm:h-32 text-lg sm:text-2xl">
            <div class="card-body p-1 sm:p-4 flex justify-center items-center ">{{ next }}</div>
          </div>
        </div>

        <div class="flex gap-4 p-4 self-end">
          <div class="kbd text-2xl font-bold">{{beatCountDown}}</div>
          <button @click="start" class="btn btn-primary">Start</button>
          <button @click="stop" class="btn btn-error">Stop</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
