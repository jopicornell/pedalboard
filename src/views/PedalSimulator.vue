<script setup lang="ts">
import { computed, type Ref, ref } from 'vue'
import { useMidi } from '../composables/useMidi'
import { type Button } from '../types/Button'
import { useFcbPedal } from '../composables/useFcbPedal'
import { type Input, type Output } from 'webmidi'
import PedalButton from '../components/PedalButton.vue'
import SweepPedal from '../components/SweepPedal.vue'
import MainLayout from '../layout/MainLayout.vue'
import { type Sweep } from '../types/Sweep'

const { pedalMidiOutput, pedalMidiInput, onPedalEvent, configureMidi } = useMidi()
void configureMidi(true)

const selectedBankIndex = ref(1)
const previousBankIndex = ref(0)
const { banks, hasDirectBank } = useFcbPedal(pedalMidiInput as Ref<Input | null>, pedalMidiOutput as Ref<Output | null>)

const selectedBank = computed(() => {
  return banks[selectedBankIndex.value]
})

const selectedBankButtons = computed(() => {
  if (hasDirectBank.value && selectedBankIndex.value === 0) {
    return [...selectedBank.value.buttons, {
      name: 'Return to previous bank',
      type: 'returnToPreviousBank'
    } satisfies Button]
  }
  if (hasDirectBank.value && selectedBankIndex.value > 0) {
    return [...selectedBank.value.buttons, { name: 'Go to Looper', type: 'returnToPreviousBank' } satisfies Button]
  }
  return selectedBank.value.buttons
})
const handleButtonClick = (index: number): void => {
  const button = selectedBankButtons.value[index]
  if (button.type === 'effect') {
    button.enabled = button.enabled === false

    pedalMidiOutput.value?.channels[button.channel].sendControlChange(button.controller, button.enabled ? 127 : 0)

    if (button.sweeps !== undefined) {
      console.log(button.sweeps, activeSweeps.value)
      button.sweeps.forEach((sweep) => {
        activeSweeps.value[sweep.pedal - 1] = (button.enabled ?? false) ? sweep : undefined
      })
    }
  }
  if (button.type === 'trigger') {
    pedalMidiOutput.value?.channels[button.channel].sendControlChange(button.controller, 127)
  }
  if (button.type === 'program') {
    pedalMidiOutput.value?.channels[button.channel].sendProgramChange(button.controller)
    if (button.sweeps !== undefined) {
      button.sweeps.forEach((sweep) => {
        activeSweeps.value[sweep.pedal - 1] = sweep
      })
    }
    banks[selectedBankIndex.value].buttons.forEach((buttonFiltered, index) => {
      if (buttonFiltered.type === 'program') {
        banks[selectedBankIndex.value].buttons[index].enabled = button === buttonFiltered
      }
    })
  }
  if (button.type === 'returnToPreviousBank') {
    if (selectedBankIndex.value === 0) {
      selectedBankIndex.value = previousBankIndex.value
    } else {
      previousBankIndex.value = selectedBankIndex.value
      selectedBankIndex.value = 0
    }
    pedalMidiOutput.value?.channels[15].sendProgramChange(selectedBankIndex.value)
  }
}

const handleBankUp = (): void => {
  if (selectedBankIndex.value < banks.length - 1) {
    selectedBankIndex.value++
  } else {
    selectedBankIndex.value = 0
  }
  pedalMidiOutput.value?.channels[15].sendProgramChange(selectedBankIndex.value)
}

const handleBankDown = (): void => {
  if (selectedBankIndex.value > 0) {
    selectedBankIndex.value--
  } else {
    selectedBankIndex.value = banks.length - 1
  }
  pedalMidiOutput.value?.channels[15].sendProgramChange(selectedBankIndex.value)
}

const handleRemoteEvent = (event: any): void => {
  const controller = event.data[1]
  if (event.message.type === 'programchange' && controller > -1 && controller < 10) {
    const button = banks[selectedBankIndex.value].buttons[controller]
    if (button === undefined) {
      return
    }
    if (button.type === 'effect') {
      button.enabled = button.enabled === false
      console.log(`Button ${button.name} is now ${button.enabled ? 'enabled' : 'disabled'}`)
      pedalMidiOutput.value?.channels[button.channel].sendControlChange(button.controller, button.enabled ? 127 : 0)
    } else if (button.type === 'program') {
      banks[selectedBankIndex.value].buttons.forEach((buttonFiltered, index) => {
        if (buttonFiltered.type === 'program') {
          console.log('button ', button === buttonFiltered, banks)
          banks[selectedBankIndex.value].buttons[index].enabled = button === buttonFiltered
        }
      })
    } else if (controller === 9) {
      if (selectedBankIndex.value === 0) {
        selectedBankIndex.value = previousBankIndex.value
      } else {
        previousBankIndex.value = selectedBankIndex.value
        selectedBankIndex.value = 0
      }
      pedalMidiOutput.value?.channels[15].sendProgramChange(selectedBankIndex.value)
    }
  }

  if (event.message.type === 'programchange' && controller === 14) {
    handleBankDown()
  }
  if (event.message.type === 'programchange' && controller === 15) {
    handleBankUp()
  }
  if (event.message.type === 'controlchange' && controller === 0) {
    previousBankIndex.value = event.value
  }
}

onPedalEvent((event) => {
  if (event.message.channel === 16) {
    handleRemoteEvent(event)
  }
  console.log(`Pedal received ${event.message.type} on channel ${event.message.channel} for controller ${event.message.dataBytes[0]} with value ${event.message.dataBytes[1]}`)
})

function handleSweepChange (sweep: Sweep | undefined, value: number): void {
  if (sweep === undefined) {
    return
  }
  sweep.value = value
  pedalMidiOutput.value?.channels[sweep.channel].sendControlChange(sweep.controller, sweep.value)
}

const activeSweeps = ref<Array<Sweep | undefined>>([])

</script>

<template>
    <MainLayout>
        <template v-slot:top-bar>
            <div class="preset-bar grid grid-cols-[1fr_auto]">
                <span class="text-4xl justify-self-center">{{ selectedBank.name }}</span>
            </div>
        </template>

        <template v-slot:buttons>
            <div class="h-full grid grid-cols-[1fr_auto] gap-4">
                <div class="h-full grid-layout grid grid-cols-6 gap-4 p-4">
                    <template v-for="(button, index) in selectedBankButtons"
                              :key="button.name">
                        <PedalButton
                                :style="{ 'order': index < 5 ? index + 6 : index - 6 }"
                                :button="button"
                                @click="handleButtonClick(index)"
                        ></PedalButton>

                        <PedalButton
                                v-if="index === 4 || index === 9"
                                :style="{ 'order': index+1 }"
                                @click="index === 4 ? handleBankUp() : handleBankDown()"
                        >
                            {{ index === 4 ? 'Up' : 'Down' }}
                        </PedalButton>
                    </template>
                </div>

                <div class="h-full grid-layout grid grid-cols-2 gap-4 p-4">
                    <SweepPedal :sweep="activeSweeps[0]" change-on-click @update:sweep-value="handleSweepChange(activeSweeps[0], $event)"></SweepPedal>
                    <SweepPedal :sweep="activeSweeps[1]" change-on-click @update:sweep-value="handleSweepChange(activeSweeps[1], $event)"></SweepPedal>
                </div>
            </div>

        </template>
    </MainLayout>
</template>

<style scoped>
.pedalboard {
    width: 100vw;
    height: 100vh;
}
</style>
