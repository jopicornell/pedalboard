import type { Input, MessageEvent, Output } from 'webmidi'
import { Message, WebMidi } from 'webmidi'
import { ref, watch } from 'vue'
import { type MidiMessage, MidiMessageType } from '@types/main'

function getDawMidiInput (): Input | null {
  return WebMidi.getInputByName('Virtual Midi Daw In') ?? null
}

function getDawMidiOutput (): Output | null {
  return WebMidi.getOutputByName('Virtual Midi Daw Out') ?? null
}

function getPedalMidiInput (simulator: boolean): Input | null {
  return WebMidi.getInputByName(simulator ? 'Virtual Midi Simulator Out' : 'Komplete Audio 6') ??
    WebMidi.getInputByName('KOMPLETE KONTROL S61 MK2 Puerto 2') ??
    WebMidi.getInputByName('Virtual Midi Simulator In') ??
    null
}

function getPedalMidiOutput (simulator: boolean): Output | null {
  return WebMidi.getOutputByName(simulator ? 'Virtual Midi Simulator In' : 'Komplete Audio 6') ??
    WebMidi.getOutputByName('KOMPLETE KONTROL S61 MK2 Puerto 1') ??
    WebMidi.getOutputByName('Virtual Midi Simulator Out') ??
    null
}

const pedalListeners = ref([] as Array<(message: MessageEvent) => void>)
const dawListeners = ref([] as Array<(message: MessageEvent) => void>)
const midiInputs = ref<Input[]>([])
const midiOutputs = ref<Output[]>([])
const dawMidiInput = ref<Input | null>(null)
const dawMidiOutput = ref<Output | null>(null)
const pedalMidiInput = ref<Input | null>(null)
const pedalMidiOutput = ref<Output | null>(null)

watch(dawMidiInput, (input, oldValue) => {
  if (oldValue !== null) {
    dawListeners.value.forEach((listener) => { oldValue.removeListener('controlchange', listener) })
    dawListeners.value.forEach((listener) => { oldValue.removeListener('programchange', listener) })
  }
  if (input !== null) {
    dawListeners.value.forEach((listener) => input.addListener('controlchange', listener))
    dawListeners.value.forEach((listener) => input.addListener('programchange', listener))
  }
})

watch(pedalMidiInput, (input, oldValue) => {
  if (oldValue !== null) {
    console.log('pedalMidiInput changed: removing listeners', oldValue.name)
    pedalListeners.value.forEach((listener) => { oldValue.removeListener('controlchange', listener) })
    pedalListeners.value.forEach((listener) => { oldValue.removeListener('programchange', listener) })
  }
  if (input !== null) {
    console.log('pedalMidiInput changed: adding listeners', input.name)
    pedalListeners.value.forEach((listener) => input.addListener('controlchange', listener))
    pedalListeners.value.forEach((listener) => input.addListener('programchange', listener))
  }
})

export function useMidi () {
  async function configureMidi (simulator: boolean = false) {
    await WebMidi.enable()
    if (!WebMidi.enabled) {
      console.error('WebMidi is not enabled')
      return
    }
    if (midiInputs.value.length === 0 || midiOutputs.value.length === 0) {
      midiInputs.value = WebMidi.inputs
      midiOutputs.value = WebMidi.outputs
    }
    if (dawMidiInput.value === null || dawMidiOutput.value === null || pedalMidiInput.value === null || pedalMidiOutput.value === null) {
      dawMidiInput.value = getDawMidiInput()
      dawMidiOutput.value = getDawMidiOutput()
      pedalMidiInput.value = getPedalMidiInput(simulator)
      pedalMidiOutput.value = getPedalMidiOutput(simulator)
    }
  }

  function onPedalEvent (listener: (event: MessageEvent) => void) {
    pedalListeners.value.push(listener)
  }

  function onDawEvent (listener: (event: MessageEvent) => void) {
    console.log('adding daw listener')
    dawListeners.value.push(listener)
  }

  function getRawMidiMessage (message: MidiMessage): Message {
    switch (message.type) {
      case MidiMessageType.ControlChange:
        return new Message(new Uint8Array([0xB0 + message.channel - 1, message.controller, message.value]))
      case MidiMessageType.ProgramChange:
        return new Message(new Uint8Array([0xC0 + message.channel - 1, message.controller]))
      case MidiMessageType.NoteOn:
        return new Message(new Uint8Array([0x90 + message.channel - 1, message.controller, message.value]))
      case MidiMessageType.NoteOff:
        return new Message(new Uint8Array([0x80 + message.channel - 1, message.controller, message.value]))
      default:
        throw new Error('Invalid MIDI message type')
    }
  }

  return {
    midiInputs,
    midiOutputs,
    dawMidiInput,
    dawMidiOutput,
    pedalMidiInput,
    pedalMidiOutput,
    configureMidi,
    onPedalEvent,
    onDawEvent,
    getRawMidiMessage
  }
}
