// Function that exports
import { type Bank } from '../types/Bank'
import { useFileSystemAccess } from '@vueuse/core'
import { banksToUno2 } from '../utils/uno2-parser'
import { computed, reactive, type Ref } from 'vue'
import { type Input, type Output } from 'webmidi'
import { MidiMessageType } from '../types/MidiMessage'
import { type Sweep } from '@/types/Sweep.ts'

export async function exportFcb (banks: Bank[]) {
  await navigator.clipboard.writeText(banksToUno2(banks))
  const fileSystem = useFileSystemAccess({
    dataType: 'Text'
  })
  // await fileSystem.create({suggestedName: 'fcb.txt'})
  fileSystem.data.value = banksToUno2(banks)
  // await fileSystem.save()
}

const sweeps = {
  Reverb: { controller: 100, channel: 1, min: 0, max: 80, name: 'Reverb', curve: 'linear', pedal: 1 },
  Delay: { controller: 101, channel: 1, min: 0, max: 100, name: 'Delay', curve: 'linear', pedal: 2 },
  Gain: { controller: 102, channel: 1, min: 0, max: 127, name: 'Gain', curve: 'linear', pedal: 1 },
  SynthGainFilter: { controller: 103, channel: 1, min: 0, max: 127, name: 'SynthGainFilter', curve: 'linear', pedal: 2 }
} as const satisfies Record<string, Sweep>

const banks = reactive<Bank[]>([
  {
    name: 'Direct Bank',
    buttons: [
      { name: 'Tap tempo', type: 'trigger', controller: 9, channel: 1 },
      { name: 'Looper rec', type: 'trigger', controller: 1, channel: 1 },
      { name: 'Looper play', type: 'trigger', controller: 2, channel: 1 },
      { name: 'Looper add', type: 'trigger', controller: 3, channel: 1 },
      { name: 'Looper stop', type: 'trigger', controller: 4, channel: 1 },
      { name: 'Looper clear', type: 'trigger', controller: 5, channel: 1 },
      { name: 'Looper reverse', type: 'effect', controller: 6, channel: 1 },
      { name: 'Looper %2', type: 'trigger', controller: 7, channel: 1 },
      {
        name: 'Looper x2',
        type: 'trigger',
        controller: 8,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 22, value: 127, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 23, value: 127, type: MidiMessageType.ControlChange }
        ]
      }
    ]
  },
  {
    name: 'General Bank',
    buttons: [
      {
        name: 'Overdrive',
        type: 'effect',
        controller: 10,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 22, value: 127, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 23, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      { name: 'Fuzz', type: 'effect', controller: 11, channel: 1 },
      { name: 'Screamer', type: 'effect', controller: 12, channel: 1 },
      { name: 'Delay', type: 'effect', controller: 13, channel: 1 },
      { name: 'Sustain Piano', type: 'trigger', controller: 64, channel: 1 },
      {
        name: 'Clean Amp',
        type: 'program',
        controller: 15,
        messages: [
          { channel: 1, controller: 19, value: 127, type: MidiMessageType.ControlChange },
          { channel: 1, controller: 20, value: 0, type: MidiMessageType.ControlChange },
          { channel: 1, controller: 21, value: 0, type: MidiMessageType.ControlChange }
        ],
        channel: 1
      },
      { name: 'EdgeBreak Amp', type: 'program', controller: 16, channel: 1 },
      { name: 'Cloudy', type: 'program', controller: 17, channel: 1 },
      { name: 'Hi gain', type: 'program', controller: 18, channel: 1 }
    ]
  },
  {
    name: 'Calabruix',
    buttons: [
      {
        name: 'Intro',
        type: 'program',
        controller: 25,
        channel: 1,
        sweeps: [
          sweeps.Gain,
          sweeps.SynthGainFilter
        ]
      },
      {
        name: 'Preset 2',
        type: 'program',
        controller: 26,
        channel: 1,
        sweeps: [
          sweeps.Gain,
          sweeps.SynthGainFilter
        ]
      },
      {
        name: 'Activate Pad',
        type: 'effect',
        controller: 27,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 129, value: 127, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 130, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Activate Voice ',
        type: 'effect',
        controller: 28,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 131, value: 126, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 132, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Overdrive2',
        type: 'effect',
        controller: 20,
        channel: 1
      },
      { name: 'Delay2', type: 'effect', controller: 21, channel: 1 },
      { name: 'Reverb2', type: 'effect', controller: 22, channel: 1 },
      { name: 'Freeze2', type: 'effect', controller: 23, channel: 1 },
      { name: 'Compressor2', type: 'trigger', controller: 24, channel: 1 }
    ]
  },
  {
    name: 'Fosca',
    buttons: [
      {
        name: 'High reverb',
        type: 'program',
        controller: 31,
        channel: 1,
        sweeps: [
          sweeps.Reverb,
          sweeps.SynthGainFilter
        ]
      },
      {
        name: 'Verse',
        type: 'program',
        controller: 32,
        channel: 1,
        sweeps: [
          sweeps.Reverb,
          sweeps.SynthGainFilter
        ]
      },
      {
        name: 'Deactivate Pad',
        type: 'trigger',
        controller: 33,
        channel: 1
      },
      {
        name: 'Activate Voice',
        type: 'effect',
        controller: 34,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      { name: 'Sustain Piano', type: 'trigger', controller: 64, channel: 1 },
      { name: 'G', type: 'trigger', controller: 36, channel: 1 },
      { name: 'Bm', type: 'trigger', controller: 37, channel: 1 },
      { name: 'C', type: 'trigger', controller: 38, channel: 1 },
      { name: 'D', type: 'trigger', controller: 39, channel: 1 }
    ]
  },
  {
    name: 'Pèrdua',
    buttons: [
      {
        name: 'Intro',
        type: 'program',
        controller: 41,
        channel: 1,
        sweeps: [
          sweeps.Reverb,
          sweeps.Delay
        ]
      },
      {
        name: 'Gain',
        type: 'program',
        controller: 42,
        channel: 1,
        sweeps: [
          sweeps.Reverb,
          sweeps.Delay
        ]
      },
      {
        name: 'Activate Pad',
        type: 'effect',
        controller: 43,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 29, value: 127, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 30, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Activate Voice ',
        type: 'effect',
        controller: 44,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Overdrive',
        type: 'effect',
        controller: 45,
        channel: 1
      },
      { name: 'Delay2', type: 'effect', controller: 46, channel: 1 },
      { name: 'Reverb2', type: 'effect', controller: 47, channel: 1 },
      { name: 'Freeze2', type: 'effect', controller: 48, channel: 1 },
      { name: 'Compressor2', type: 'effect', controller: 49, channel: 1 }
    ]
  },
  {
    name: 'Ho has gravat',
    buttons: [
      {
        name: 'Preset 1',
        type: 'program',
        controller: 51,
        channel: 1,
        sweeps: [
          sweeps.Reverb,
          sweeps.Delay
        ]
      },
      {
        name: 'Preset 2',
        type: 'program',
        controller: 52,
        channel: 1,
        sweeps: [
          sweeps.Reverb,
          sweeps.Delay
        ]
      },
      {
        name: 'Activate Pad',
        type: 'effect',
        controller: 53,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 29, value: 127, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 30, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Activate Voice ',
        type: 'effect',
        controller: 54,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Overdrive',
        type: 'effect',
        controller: 55,
        channel: 1
      },
      { name: 'Delay2', type: 'effect', controller: 56, channel: 1 },
      { name: 'Reverb2', type: 'effect', controller: 57, channel: 1 },
      { name: 'Freeze2', type: 'effect', controller: 58, channel: 1 },
      { name: 'Compressor2', type: 'effect', controller: 59, channel: 1 }
    ]
  },
  {
    name: 'Mariner',
    buttons: [
      {
        name: 'Preset 1',
        type: 'program',
        controller: 61,
        channel: 1,
        sweeps: [
          sweeps.Reverb,
          sweeps.Delay
        ]
      },
      {
        name: 'Preset 2',
        type: 'program',
        controller: 62,
        channel: 1,
        sweeps: [
          sweeps.Reverb,
          sweeps.Delay
        ]
      },
      {
        name: 'Activate Pad',
        type: 'effect',
        controller: 63,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 29, value: 127, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 30, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Activate Voice ',
        type: 'effect',
        controller: 64,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Overdrive',
        type: 'effect',
        controller: 65,
        channel: 1
      },
      { name: 'Delay2', type: 'effect', controller: 66, channel: 1 },
      { name: 'Reverb2', type: 'effect', controller: 67, channel: 1 },
      { name: 'Freeze2', type: 'effect', controller: 68, channel: 1 },
      { name: 'Compressor2', type: 'effect', controller: 69, channel: 1 }
    ]
  },
  {
    name: 'Sinte volador',
    buttons: [
      { name: 'Cm', type: 'trigger', controller: 71, channel: 1 },
      { name: 'Ab/Cm', type: 'trigger', controller: 72, channel: 1 },
      { name: 'Bb', type: 'trigger', controller: 73, channel: 1 },
      { name: 'Eb', type: 'trigger', controller: 74, channel: 1 },
      { name: 'Eb', type: 'trigger', controller: 75, channel: 1 },
      {
        name: 'Preset 1',
        type: 'program',
        controller: 76,
        channel: 1,
        sweeps: [
          sweeps.Gain,
          sweeps.SynthGainFilter
        ]
      },
      {
        name: 'Preset 2',
        type: 'program',
        controller: 77,
        channel: 1,
        sweeps: [
          sweeps.Gain,
          sweeps.SynthGainFilter
        ]
      },
      {
        name: 'Deactivate Pad',
        type: 'effect',
        controller: 70,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 79, value: 127, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 80, value: 127, type: MidiMessageType.ControlChange }
        ]
      },
      {
        name: 'Void',
        type: 'effect',
        controller: 64,
        channel: 1,
        onMessages: [
          { channel: 1, controller: 31, value: 126, type: MidiMessageType.ControlChange }
        ],
        offMessages: [
          { channel: 1, controller: 32, value: 127, type: MidiMessageType.ControlChange }
        ]
      }
    ]
  }
])

export const useFcbPedal = (pedalInput: Ref<Input | null>, pedalOutput: Ref<Output | null>) => {
  const goToBank = (bankNumber: number) => {
    pedalOutput.value?.channels[16].sendControlChange(0, bankNumber)
  }
  const hasDirectBank = computed(() => banks.some(bank => bank.name === 'Direct Bank'))

  return {
    exportFcb: async () => {
      await exportFcb(banks)
    },
    banks,
    hasDirectBank,
    goToBank
  }
}
