import type { EntryType } from './entry'

export interface Category {
  type: Exclude<EntryType, 'transfer'>
  icon: string
  value: string
  label: string
}
