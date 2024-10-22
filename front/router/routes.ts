import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: async () => await import('@/views/PedalBoard.vue')
        },
        {
            path: '/simulator',
            name: 'PedalSimulator',
            component: async () => await import('@/views/PedalSimulator.vue')
        },
        {
            path: '/exercises',
            name: 'Exercises',
            component: async () => await import('@/views/exercises/ExercisesView.vue'),
            children: [
                {
                    path: 'fretboard',
                    name: 'Fretboard',
                    component: async () => await import('@/views/exercises/ExerciseFretboard.vue')
                }
            ]
        }
    ]
})
