import { Database } from './supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Customer = Database['public']['Tables']['clients']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
