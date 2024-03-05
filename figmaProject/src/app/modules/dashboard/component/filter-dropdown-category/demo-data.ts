export interface Bank {
  key: number
  value: string
}

export interface BankGroup {
  name: string
  banks: Bank[]
}

/** list of banks */
export const BANKS: Bank[] = [
  { key: 1, value: 'Hospital Visit' },
  { key: 2, value: 'Tele-consultation' },
  { key: 3, value: 'Home Visit' },
]
