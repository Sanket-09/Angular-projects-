export interface Bank {
    key: number;
    value: string;
  }
  
  export interface BankGroup {
    name: string;
    banks: Bank[];
  }
  
  
  /** list of banks */
  export const BANKS: Bank[] = [
    {key: 1,value: 'General Medicine'},
    {key: 2,value: 'Cardiology'},
    {key: 3,value: 'Pediatrics'},
    {key: 4,value: 'Oncologist'},
    {key: 5,value: 'Endocrinologist'},
    {key: 5,value: 'Neurology'},
    {key: 5,value: 'Radiology'}
  ];