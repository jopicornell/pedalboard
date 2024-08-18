<script setup lang="ts">
import MetronomeCard from '@/components/MetronomeCard.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import fretboard from '@/assets/images/fretboard.png'
import { useRouter } from 'vue-router'

const router = useRouter()

async function goToFretBoard (): Promise<void> {
  await router.push({
    name: 'Fretboard'
  })
}

</script>

<template>
  <div class="flex flex-col">
  <div class="flex gap-4 p-4 flex-wrap">
    <MetronomeCard></MetronomeCard>
    <ExerciseCard title="Fretboard" description="Practice fretboard memory and position by finding 1 note per string per beat" :image="fretboard" @click="goToFretBoard()"/>
    <ExerciseCard/>
  </div>
    <router-view/>
  </div>
</template>

<style scoped>

</style>
