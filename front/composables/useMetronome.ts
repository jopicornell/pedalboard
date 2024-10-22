import MetronomeWorker from '@/workers/metronome.worker.ts?url'
import metronomeWav from '@/assets/audio/Metronome.wav?url'
import { computed, type Ref, ref, watch } from 'vue'
import mitt, { type Emitter } from 'mitt'

type BeatEmitterAfter = Record<string, unknown> & {
  click: null
}

interface MetronomeComposable {
  bpm: Ref<number>
  setBpm: (bpm: number) => void
  isPlaying: boolean
  beat: number
  setBeat: (beat: number) => void
  beatCount: number
  setBeatCount: (beatCount: number) => void
  start: () => void
  stop: () => void
  beatEmitter: Emitter<BeatEmitter>
  emitAfter: (beats: number, offset?: number) => Emitter<BeatEmitterAfter>
}

let audioContext: AudioContext | null = null
let beatCount = 0
let metronomeAudio = new Audio(metronomeWav)

const bpm = ref(60)
const secondsPerBeat = computed(() => 60 / bpm.value)
const started = ref(false)

interface EmitBeat {
  bar: number
  beatCount: number
}

type BeatEmitter = Record<string, unknown> & {
  click: EmitBeat
}

const beatEmitter = mitt<BeatEmitter>()

function initAudio (): void {
  if (audioContext !== null) return
  audioContext = new AudioContext()
  const metronomeSource = audioContext.createMediaElementSource(metronomeAudio)
  metronomeSource.connect(audioContext.destination)
  const gainNode = audioContext.createGain()
  gainNode.connect(audioContext.destination)
  // create a buffer source and add the buffer
  const source = audioContext.createBufferSource()
  source.buffer = audioContext.createBuffer(1, 1, 22050)
  // start playing the audio data immediately
  source.start(0)
}

const worker = new Worker(MetronomeWorker)

let nextBeatTime = 0
const tick = (): void => {
  if (audioContext === null) return
  while (nextBeatTime < audioContext?.currentTime + 0.1) {
    metronomeAudio.play().catch(console.error)
    nextBeatTime += secondsPerBeat.value
    beatEmitter.emit('click', { bar: Math.floor(beatCount / 4), beatCount })
    beatCount += 1
  }
}

worker.onmessage = ({ data }) => {
  if (data === 'tick') {
    tick()
  }
}

export function useMetronome (): MetronomeComposable {
  const start = (): void => {
    started.value = true
    initAudio()
    setTimeout(() => {
      worker.postMessage({ message: 'start' })
    }, 100)
  }

  const stop = (): void => {
    started.value = false
    worker.postMessage({ message: 'stop' })

    audioContext?.close().catch(console.error)
    audioContext = null
    metronomeAudio.src = ''
    metronomeAudio = new Audio(metronomeWav)

    nextBeatTime = 0
    beatCount = 0
  }

  watch(bpm, () => {
    if (started.value) {
      stop()
      start()
    }
  })

  const emitAfter = (beats: number, offset?: number): Emitter<BeatEmitterAfter> => {
    let lastEmittedBar = 0
    const emitter = mitt<BeatEmitterAfter>()
    beatEmitter.on('click', ({ beatCount }) => {
      console.log(`beatCount: ${beatCount}, beats: ${beats}, offset: ${offset}`)
      if (offset !== undefined && beatCount < offset) return
      const beatOffsetted = beatCount - (offset ?? 0)
      const emittedBar = beatOffsetted / beats
      if (beatOffsetted % beats === 0 && lastEmittedBar < emittedBar) {
        console.log(`beatCount: ${beatOffsetted}, beats: ${beats}, emittedBar: ${emittedBar} lastEmittedBar: ${lastEmittedBar} `)
        emitter.emit('click', null)
        lastEmittedBar = emittedBar
      }
    })
    return emitter
  }

  return {
    start,
    bpm,
    setBpm: () => {},
    isPlaying: false,
    beat: 0,
    setBeat: () => {},
    beatCount: 0,
    setBeatCount: () => {},
    stop,
    beatEmitter,
    emitAfter
  }
}
