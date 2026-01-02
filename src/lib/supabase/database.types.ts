export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      audit_events: {
        Row: {
          actor_user_id: string | null;
          created_at: string;
          entity_id: string | null;
          entity_type: string;
          event_type: string;
          id: string;
          metadata: Json;
          org_id: string | null;
        };
        Insert: {
          actor_user_id?: string | null;
          created_at?: string;
          entity_id?: string | null;
          entity_type: string;
          event_type: string;
          id?: string;
          metadata?: Json;
          org_id?: string | null;
        };
        Update: {
          actor_user_id?: string | null;
          created_at?: string;
          entity_id?: string | null;
          entity_type?: string;
          event_type?: string;
          id?: string;
          metadata?: Json;
          org_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "audit_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      design_assets: {
        Row: {
          bucket: string;
          created_at: string;
          design_session_id: string;
          id: string;
          org_id: string;
          path: string;
          type: Database["public"]["Enums"]["design_asset_type"];
        };
        Insert: {
          bucket: string;
          created_at?: string;
          design_session_id: string;
          id?: string;
          org_id: string;
          path: string;
          type?: Database["public"]["Enums"]["design_asset_type"];
        };
        Update: {
          bucket?: string;
          created_at?: string;
          design_session_id?: string;
          id?: string;
          org_id?: string;
          path?: string;
          type?: Database["public"]["Enums"]["design_asset_type"];
        };
        Relationships: [
          {
            foreignKeyName: "design_assets_design_session_id_fkey";
            columns: ["design_session_id"];
            isOneToOne: false;
            referencedRelation: "design_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "design_assets_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      design_sessions: {
        Row: {
          created_at: string;
          export_count: number;
          id: string;
          metadata: Json;
          org_id: string;
          prospect_id: string;
          status: Database["public"]["Enums"]["design_session_status"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          export_count?: number;
          id?: string;
          metadata?: Json;
          org_id: string;
          prospect_id: string;
          status?: Database["public"]["Enums"]["design_session_status"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          export_count?: number;
          id?: string;
          metadata?: Json;
          org_id?: string;
          prospect_id?: string;
          status?: Database["public"]["Enums"]["design_session_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "design_sessions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "design_sessions_prospect_id_fkey";
            columns: ["prospect_id"];
            isOneToOne: false;
            referencedRelation: "prospects";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          order_id: string;
          product_id: string | null;
          quantity: number;
          unit_price_cents: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          order_id: string;
          product_id?: string | null;
          quantity: number;
          unit_price_cents: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          order_id?: string;
          product_id?: string | null;
          quantity?: number;
          unit_price_cents?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string;
          currency: string;
          id: string;
          org_id: string;
          prospect_id: string | null;
          status: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id: string;
          stripe_payment_intent_id: string | null;
          total_cents: number;
          type: Database["public"]["Enums"]["order_type"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          currency?: string;
          id?: string;
          org_id: string;
          prospect_id?: string | null;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id: string;
          stripe_payment_intent_id?: string | null;
          total_cents: number;
          type: Database["public"]["Enums"]["order_type"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          currency?: string;
          id?: string;
          org_id?: string;
          prospect_id?: string | null;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id?: string;
          stripe_payment_intent_id?: string | null;
          total_cents?: number;
          type?: Database["public"]["Enums"]["order_type"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_prospect_id_fkey";
            columns: ["prospect_id"];
            isOneToOne: false;
            referencedRelation: "prospects";
            referencedColumns: ["id"];
          },
        ];
      };
      org_members: {
        Row: {
          created_at: string;
          id: string;
          org_id: string;
          role: Database["public"]["Enums"]["member_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          org_id: string;
          role: Database["public"]["Enums"]["member_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          org_id?: string;
          role?: Database["public"]["Enums"]["member_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "org_members_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          status: Database["public"]["Enums"]["org_status"];
          stripe_account_id: string | null;
          type: Database["public"]["Enums"]["org_type"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          status?: Database["public"]["Enums"]["org_status"];
          stripe_account_id?: string | null;
          type: Database["public"]["Enums"]["org_type"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          status?: Database["public"]["Enums"]["org_status"];
          stripe_account_id?: string | null;
          type?: Database["public"]["Enums"]["org_type"];
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          active: boolean;
          created_at: string;
          currency: string;
          description: string | null;
          id: string;
          image_asset_path: string | null;
          name: string;
          price_cents: number;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          image_asset_path?: string | null;
          name: string;
          price_cents: number;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          image_asset_path?: string | null;
          name?: string;
          price_cents?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      prospects: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          name: string;
          org_id: string;
          phone: string;
          source: Database["public"]["Enums"]["prospect_source"];
          status: Database["public"]["Enums"]["prospect_status"];
          updated_at: string;
          zip: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          name: string;
          org_id: string;
          phone: string;
          source?: Database["public"]["Enums"]["prospect_source"];
          status?: Database["public"]["Enums"]["prospect_status"];
          updated_at?: string;
          zip: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
          org_id?: string;
          phone?: string;
          source?: Database["public"]["Enums"]["prospect_source"];
          status?: Database["public"]["Enums"]["prospect_status"];
          updated_at?: string;
          zip?: string;
        };
        Relationships: [
          {
            foreignKeyName: "prospects_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      stripe_events: {
        Row: {
          created_at: string;
          event_id: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          type: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          type?: string;
        };
        Relationships: [];
      };
      territories: {
        Row: {
          active_from: string;
          active_to: string | null;
          created_at: string;
          id: string;
          org_id: string;
          priority: number;
          updated_at: string;
          zip: string;
        };
        Insert: {
          active_from: string;
          active_to?: string | null;
          created_at?: string;
          id?: string;
          org_id: string;
          priority?: number;
          updated_at?: string;
          zip: string;
        };
        Update: {
          active_from?: string;
          active_to?: string | null;
          created_at?: string;
          id?: string;
          org_id?: string;
          priority?: number;
          updated_at?: string;
          zip?: string;
        };
        Relationships: [
          {
            foreignKeyName: "territories_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_corporate_admin: { Args: never; Returns: boolean };
      is_org_member: { Args: { target_org_id: string }; Returns: boolean };
      user_org_ids: { Args: never; Returns: string[] };
    };
    Enums: {
      design_asset_type: "image" | "pdf" | "other";
      design_session_status: "started" | "in_progress" | "exported" | "archived";
      member_role: "corporate_admin" | "licensee_owner" | "licensee_sales";
      order_status: "pending" | "paid" | "cancelled" | "refunded" | "failed";
      order_type: "deposit" | "merch";
      org_status: "active" | "suspended";
      org_type: "corporate" | "licensee";
      prospect_source: "design" | "manual" | "import";
      prospect_status: "new" | "contacted" | "qualified" | "won" | "lost";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends { Row: infer R }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends { Insert: infer I }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends { Update: infer U }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      design_asset_type: ["image", "pdf", "other"],
      design_session_status: ["started", "in_progress", "exported", "archived"],
      member_role: ["corporate_admin", "licensee_owner", "licensee_sales"],
      order_status: ["pending", "paid", "cancelled", "refunded", "failed"],
      order_type: ["deposit", "merch"],
      org_status: ["active", "suspended"],
      org_type: ["corporate", "licensee"],
      prospect_source: ["design", "manual", "import"],
      prospect_status: ["new", "contacted", "qualified", "won", "lost"],
    },
  },
} as const;


