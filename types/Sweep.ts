export interface Sweep {
  id?: number
  name: string
  controller: number
  channel: number
  min: number
  max: number
  curve: 'linear' | 'fast' | 'slow'
  pedal: 1 | 2
  value?: number
}
