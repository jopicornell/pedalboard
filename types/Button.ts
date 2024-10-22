import { type Sweep } from './Sweep.ts'
import { type MidiMessage } from './MidiMessage.ts'

export interface BaseButton {
  id?: number
  position: number
  name: string
  enabled?: boolean
  sweeps?: Sweep[]
}

export interface EffectButton extends BaseButton {
  type: 'effect'
  controller: number
  channel: number
  onMessages?: MidiMessage[]
  offMessages?: MidiMessage[]
}

export interface TriggerButton extends BaseButton {
  type: 'trigger'
  controller: number
  channel: number
  onMessages?: MidiMessage[]
  offMessages?: MidiMessage[]
}

export interface ProgramButton extends BaseButton {
  type: 'program'
  controller: number
  channel: number
  messages?: MidiMessage[]
}

export interface ReturnToBankButton extends BaseButton {
  type: 'returnToPreviousBank'
}

export interface GoToDirectBankButton extends BaseButton {
  type: 'goToDirectBank'
}

export type ButtonWithController = EffectButton | TriggerButton | ProgramButton

export type Button = EffectButton | TriggerButton | ProgramButton | ReturnToBankButton | GoToDirectBankButton

export type ButtonWithId = Button & { id: number }
