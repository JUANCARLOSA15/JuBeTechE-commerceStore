export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          price: number
          category: string
          image: string
          customizable: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          price: number
          category: string
          image: string
          customizable?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          price?: number
          category?: string
          image?: string
          customizable?: boolean
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          customer_name: string
          customer_email: string
          customer_phone?: string
          status: 'pending' | 'processing' | 'completed'
          total_amount: number
          items: Json[]
        }
        Insert: {
          id?: string
          created_at?: string
          customer_name: string
          customer_email: string
          customer_phone?: string
          status?: 'pending' | 'processing' | 'completed'
          total_amount: number
          items: Json[]
        }
        Update: {
          id?: string
          created_at?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          status?: 'pending' | 'processing' | 'completed'
          total_amount?: number
          items?: Json[]
        }
      }
      print_requests: {
        Row: {
          id: string
          created_at: string
          customer_name: string
          customer_email: string
          customer_phone?: string
          status: 'pending' | 'processing' | 'completed'
          file_url: string
          print_config: Json
          total_amount: number
        }
        Insert: {
          id?: string
          created_at?: string
          customer_name: string
          customer_email: string
          customer_phone?: string
          status?: 'pending' | 'processing' | 'completed'
          file_url: string
          print_config: Json
          total_amount: number
        }
        Update: {
          id?: string
          created_at?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          status?: 'pending' | 'processing' | 'completed'
          file_url?: string
          print_config?: Json
          total_amount?: number
        }
      }
      uploads: {
        Row: {
          id: string
          created_at: string
          file_name: string
          file_size: number
          file_type: string
          storage_path: string
          metadata: Json
        }
        Insert: {
          id?: string
          created_at?: string
          file_name: string
          file_size: number
          file_type: string
          storage_path: string
          metadata?: Json
        }
        Update: {
          id?: string
          created_at?: string
          file_name?: string
          file_size?: number
          file_type?: string
          storage_path?: string
          metadata?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}