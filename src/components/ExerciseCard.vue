<script setup lang="ts">
interface Props {
  title: string
  description?: string
  image?: string
}

type Emits = (event: 'click') => boolean

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div @click="emit('click')" class="card w-[15rem] bg-base-100 shadow-xl before:!bg-slate-950 image-full  cursor-pointer">
    <figure v-if="image"><img :src="image" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="card-actions justify-end">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
