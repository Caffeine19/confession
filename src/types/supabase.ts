export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          icon: string
          id: number
          label: string
          type: Database['public']['Enums']['entry_type'] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          icon?: string
          id?: number
          label?: string
          type?: Database['public']['Enums']['entry_type'] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          icon?: string
          id?: number
          label?: string
          type?: Database['public']['Enums']['entry_type'] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'category_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      entry: {
        Row: {
          amount: number
          category_id: number | null
          created_at: string
          id: number
          property_id: number
          remark: string | null
          type: Database['public']['Enums']['entry_type']
          user_id: string | null
        }
        Insert: {
          amount: number
          category_id?: number | null
          created_at?: string
          id?: number
          property_id: number
          remark?: string | null
          type: Database['public']['Enums']['entry_type']
          user_id?: string | null
        }
        Update: {
          amount?: number
          category_id?: number | null
          created_at?: string
          id?: number
          property_id?: number
          remark?: string | null
          type?: Database['public']['Enums']['entry_type']
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'entry_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'entry_property_id_fkey'
            columns: ['property_id']
            isOneToOne: false
            referencedRelation: 'property'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'entry_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      property: {
        Row: {
          amount: number
          created_at: string
          id: number
          label: string
          type: Database['public']['Enums']['property_type']
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: number
          label: string
          type?: Database['public']['Enums']['property_type']
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          label?: string
          type?: Database['public']['Enums']['property_type']
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'property_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_summary:
        | {
            Args: {
              begin_date: string
              end_date: string
              entry_type: string
            }
            Returns: number
          }
        | {
            Args: {
              begin_date: string
              end_date: string
              summary_type: Database['public']['Enums']['entry_type']
            }
            Returns: number
          }
    }
    Enums: {
      entry_type: 'input' | 'output' | 'transfer'
      property_type: 'debit' | 'credit' | 'other' | 'investment'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
