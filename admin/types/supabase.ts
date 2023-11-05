export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          organisation: string;
          role: string | null;
          email: string | null;
        };
        Insert: {
          full_name: string | null;
          phone: string | null;
          organisation: string;
          role: string | null;
          email: string | null;
        };
        Update: {
          full_name: string | null;
          phone: string | null;
          organisation: string;
          role: string | null;
          email: string | null;
        };
      };
      clients: {
        Row: {
          id: number;
          name: string;
          brand: string;
          instagram?: string;
          email: string;
          phone?: string;
          spent: number;
          created_at: string;
        };
        Insert: {
          name: string;
          brand: string;
          instagram?: string;
          email: string;
          phone?: string;
          spent?: number;
        };
        Update: {
          name?: string;
          brand?: string;
          instagram?: string;
          email?: string;
          phone?: string;
          spent?: number;
        };
      };
      orders: {
        Row: {
          id: number;
          total: number;
          saleby: string;
          incentive: boolean;
          client_id: number;
          profiles: any;
          clients: any;
          attachments: string | null;
          payment: string | null;
          created_at: string;
        };
        Insert: {
          total: number;
          saleby: string;
          incentive: boolean;
          client_id: number;
          attachments?: string | null;
          payment?: string | null;
        };
        Update: {
          total: number;
          saleby: string;
          incentive: boolean;
          client_id: number;
          attachments?: string | null;
          payment?: string | null;
        };
      };
      posts: {
        Row: {
          id: number;
          type: string;
          order_id: number;
          scheduled?: string | null;
          created_at?: string;
          collaboration?: string;
          asset?: string;
          caption?: string;
          link?: string;
          orders: any;
          insight: string | null;
        };
        Insert: {
          type: string;
          order_id: number;
          scheduled?: string | null;
          created_at?: string;
          insight?: string;
        };
        Update: {
          type?: string;
          order_id?: number;
          scheduled?: string | null;
          created_at?: string;
          collaboration?: string;
          asset?: string;
          caption?: string;
          link?: string;
          insight?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
