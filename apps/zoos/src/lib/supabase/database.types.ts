export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  zoos: {
    Tables: {
      objects: {
        Row: {
          access_manage_emails: string[];
          access_manage_group_ids: number[];
          access_read_emails: string[];
          access_read_group_ids: number[];
          access_write_emails: string[];
          access_write_group_ids: number[];
          created_at: string;
          description: string;
          folder_id: number | null;
          id: number;
          last_updated_at: string;
          last_updated_email: string;
          metadata: Json;
          name: string;
          object_data: Json;
          object_type: string;
          owner_email: string;
        };
        Insert: {
          access_manage_emails?: string[];
          access_manage_group_ids?: number[];
          access_read_emails?: string[];
          access_read_group_ids?: number[];
          access_write_emails?: string[];
          access_write_group_ids?: number[];
          created_at?: string;
          description?: string;
          folder_id?: number | null;
          id?: number;
          last_updated_at?: string;
          last_updated_email: string;
          metadata?: Json;
          name?: string;
          object_data: Json;
          object_type: string;
          owner_email: string;
        };
        Update: {
          access_manage_emails?: string[];
          access_manage_group_ids?: number[];
          access_read_emails?: string[];
          access_read_group_ids?: number[];
          access_write_emails?: string[];
          access_write_group_ids?: number[];
          created_at?: string;
          description?: string;
          folder_id?: number | null;
          id?: number;
          last_updated_at?: string;
          last_updated_email?: string;
          metadata?: Json;
          name?: string;
          object_data?: Json;
          object_type?: string;
          owner_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "objects_folder_id_fkey";
            columns: ["folder_id"];
            isOneToOne: false;
            referencedRelation: "objects_folders";
            referencedColumns: ["id"];
          },
        ];
      };
      objects_folders: {
        Row: {
          access_manage: string[];
          access_read: string[];
          access_write: string[];
          created_at: string;
          description: string | null;
          id: number;
          metadata: Json;
          owner_email: string;
          path: string;
          update_email: string;
          updated_at: string;
        };
        Insert: {
          access_manage?: string[];
          access_read?: string[];
          access_write?: string[];
          created_at?: string;
          description?: string | null;
          id?: number;
          metadata: Json;
          owner_email: string;
          path: string;
          update_email: string;
          updated_at?: string;
        };
        Update: {
          access_manage?: string[];
          access_read?: string[];
          access_write?: string[];
          created_at?: string;
          description?: string | null;
          id?: number;
          metadata?: Json;
          owner_email?: string;
          path?: string;
          update_email?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      objects_groups: {
        Row: {
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects_history: {
        Row: {
          id: number | null;
          metadata: Json;
          object_data: Json;
          tag: string | null;
          update_email: string;
          updated_at: string;
        };
        Insert: {
          id?: number | null;
          metadata: Json;
          object_data: Json;
          tag?: string | null;
          update_email: string;
          updated_at?: string;
        };
        Update: {
          id?: number | null;
          metadata?: Json;
          object_data?: Json;
          tag?: string | null;
          update_email?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "objects_history_id_fkey";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "objects";
            referencedColumns: ["id"];
          },
        ];
      };
      objects_users: {
        Row: {
          email: string;
          user_type: Database["zoos"]["Enums"]["objects_user_type_enum"];
        };
        Insert: {
          email: string;
          user_type: Database["zoos"]["Enums"]["objects_user_type_enum"];
        };
        Update: {
          email?: string;
          user_type?: Database["zoos"]["Enums"]["objects_user_type_enum"];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      objects_user_type_enum: "user" | "admin";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
