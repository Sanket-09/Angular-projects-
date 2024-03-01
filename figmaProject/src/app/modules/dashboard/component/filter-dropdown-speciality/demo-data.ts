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
  { key: 1, name: 'Orthopedics' },
  { key: 2, name: 'Cardiology' },
  { key: 3, name: 'Dermatology' },
  { key: 4, name: 'Oncology' },
  { key: 5, name: 'Radiology' },
  { key: 6, name: 'Endocrinology' },
  { key: 7, name: 'General Medicine' },
  { key: 8, name: 'Pediatrics' },
  { key: 9, name: 'Neurology' },
  { key: 10, name: 'Urology' },
]
