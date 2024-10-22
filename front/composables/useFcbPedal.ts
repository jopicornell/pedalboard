// Function that exports
import { type Bank } from '@types'
import { useFileSystemAccess } from '@vueuse/core'
import { banksToUno2 } from '../utils/uno2-parser'
import { computed, reactive, ref, type Ref, watch } from 'vue'
import { type Input, type Output } from 'webmidi'
import { useBanks } from '@/composables/useBanks.ts';

export async function exportFcb (banks: Bank[]) {
  await navigator.clipboard.writeText(banksToUno2(banks))
  const fileSystem = useFileSystemAccess({
    dataType: 'Text'
  })
  // await fileSystem.create({suggestedName: 'fcb.txt'})
  fileSystem.data.value = banksToUno2(banks)
  // await fileSystem.save()
}

export const useFcbPedal = (pedalInput: Ref<Input | null>, pedalOutput: Ref<Output | null>) => {
  const goToBank = (bankNumber: number) => {
    pedalOutput.value?.channels[16].sendControlChange(0, bankNumber)
  }
  const { banks: banksResult, hasDirectBank, isFetching, isFinished, error } = useBanks()
  const banks = ref<Bank[]>([])

  // Needed as useBanks is a shallow reactive object
  watch(banksResult, (banksResult) => {
    if (banksResult === null || banksResult === undefined) {
      return
    }
    banks.value = banksResult
  }, { deep: true })
  return {
    exportFcb: async () => {
      if (banks.value === null) {
        return
      }
      await exportFcb(banks.value)
    },
    isFetching,
    isFinished,
    error,
    banks,
    hasDirectBank,
    goToBank
  }
}
