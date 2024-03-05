export interface Bank {
  key: number
  name: string
}

export interface BankGroup {
  name: string
  banks: Bank[]
}

/** list of banks */
export const BANKS: Bank[] = [
  { key: 1, name: 'Hospital Visit' },
  { key: 2, name: 'Tele-consultation' },
  { key: 3, name: 'Home Visit' },
]
