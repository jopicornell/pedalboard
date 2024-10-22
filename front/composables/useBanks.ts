import { useFetchApi } from '@/composables/useFetchApi.ts';
import { Bank } from '@types';
import { computed, Ref, watch } from 'vue';

export const useBanks = () => {
    const { data: banks, isFetching, isFinished, error } = useFetchApi<Bank[]>('projects/1/banks', {
        afterFetch(ctx) {
            (ctx.data as Bank[]).forEach((bank) => {
                bank.buttons.forEach((button) => {
                    button.enabled = false
                })
            })
            return ctx
        },
        initialData: []
    }).json<Bank[]>()

    const hasDirectBank = computed(() => {
        if (banks.value === null || banks.value === undefined || isFetching.value || !isFinished.value || error.value !== null) {
            return false;
        }
        console.log('banks', banks.value)
        return banks.value.some(bank => bank.name === 'Direct Bank')
    })
    watch([hasDirectBank], () => {
        console.log('hasDirectBank', hasDirectBank.value)
    }, { immediate: true })

    return {
        banks,
        hasDirectBank,
        isFetching,
        isFinished,
        error
    }
}

export const useSaveBank = (bank: Ref<Bank>) => {
    const { isFetching, isFinished, error } = useFetchApi<Bank[]>('projects/1/banks', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).put(bank)
}
