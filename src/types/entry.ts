import type { Database } from './supabase'
import type { Category } from './category'

export type EntryType = 'output' | 'input' | 'transfer'

export type Entry = Database['public']['Tables']['entry']['Row']

export type EntryWithCategory = Omit<Entry, 'category'> & {
  category: Pick<Category, 'label' | 'icon' | 'id'> | null
}

export interface DateGroupedEntryList {
  date: string
  entryList: EntryWithCategory[]
}
