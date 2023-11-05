export interface User {
  id: string;
  full_name: string | null;
}

export interface Post {
  id: number;
  type: string;
  order_id: number;
  collaboration?: string;
  asset?: string;
  caption?: string;
  scheduled?: string | null;
  created_at?: string;
  orders?: any;
  link?: string;
  insight: string | null;
}
