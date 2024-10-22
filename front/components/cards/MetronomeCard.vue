<script setup lang="ts">

import { useMetronome } from '@/composables/useMetronome.ts'

const { bpm, start, stop } = useMetronome()
</script>

<template>
  <div class="card w-[21rem] bg-base-100 bg-neutral shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Metronome</h2>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">BPM</span>
        </div>
        <input type="text" v-model="bpm" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
      </label>
      <div class="card-actions justify-end">
        <button  @click="start()" class="btn btn-primary">Start</button>
        <button @click="stop()" class="btn btn-error">Stop</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
