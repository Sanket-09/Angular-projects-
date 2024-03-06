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
  { key: 1, value: 'Orthopedics' },
  { key: 2, value: 'Cardiology' },
  { key: 3, value: 'Dermatology' },
  { key: 4, value: 'Oncology' },
  { key: 5, value: 'Radiology' },
  { key: 6, value: 'Endocrinology' },
  { key: 7, value: 'General Medicine' },
  { key: 8, value: 'Pediatrics' },
  { key: 9, value: 'Neurology' },
  { key: 10, value: 'Urology' },
]
