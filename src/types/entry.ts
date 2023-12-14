import type { Category } from './category'

export type EntryType = 'output' | 'input' | 'transfer'

export interface Entry {
  createTime: string
  amount: number
  category: Category
  type: EntryType
}
