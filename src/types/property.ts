import { type Database } from './supabase'

export type Property = Database['public']['Tables']['property']['Row']

export type TypeGroupedPropertyList = {
  type: Property['type']
  propertyList: Property[]
}
