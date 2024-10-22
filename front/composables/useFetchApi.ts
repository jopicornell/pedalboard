import { createFetch } from '@vueuse/core';

export const useFetchApi = createFetch({
    baseUrl: 'http://localhost:3000/',
})
