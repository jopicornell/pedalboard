import { type Button } from './Button.ts'

export interface Bank {
  id?: number
  name: string
  buttons: Button[]
}

export interface BankWithId extends Bank {
  id: number
}
