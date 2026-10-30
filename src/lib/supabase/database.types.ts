export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      beta_phases: {
        Row: {
          id: string;
          phase_key: string;
          display_name: string;
          capacity: number;
          status: "draft" | "open" | "full" | "closed";
          opens_at: string | null;
          closes_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phase_key: string;
          display_name: string;
          capacity?: number;
          status?: "draft" | "open" | "full" | "closed";
          opens_at?: string | null;
          closes_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phase_key?: string;
          display_name?: string;
          capacity?: number;
          status?: "draft" | "open" | "full" | "closed";
          opens_at?: string | null;
          closes_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      beta_applications: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          normalized_email: string;
          email_verified_at: string | null;
          status:
            | "pending_email_verification"
            | "phase1_accepted"
            | "phase2_waitlist"
            | "invited_phase2"
            | "withdrawn"
            | "rejected_abuse";
          phase_id: string | null;
          seat_number: number | null;
          primary_feature_interests: string[];
          other_feature_interest_text: string | null;
          device_platform: "android" | "ios" | "both" | "not_sure" | null;
          preferred_language: "en" | "hi";
          privacy_notice_version: string;
          privacy_accepted_at: string;
          beta_terms_version: string;
          terms_accepted_at: string;
          marketing_consent: boolean;
          marketing_consent_at: string | null;
          verification_token_hash: string | null;
          verification_sent_at: string | null;
          verification_expires_at: string | null;
          allocation_order_at: string | null;
          withdrawn_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          normalized_email: string;
          email_verified_at?: string | null;
          status?:
            | "pending_email_verification"
            | "phase1_accepted"
            | "phase2_waitlist"
            | "invited_phase2"
            | "withdrawn"
            | "rejected_abuse";
          phase_id?: string | null;
          seat_number?: number | null;
          primary_feature_interests?: string[];
          other_feature_interest_text?: string | null;
          device_platform?: "android" | "ios" | "both" | "not_sure" | null;
          preferred_language?: "en" | "hi";
          privacy_notice_version?: string;
          privacy_accepted_at?: string;
          beta_terms_version?: string;
          terms_accepted_at?: string;
          marketing_consent?: boolean;
          marketing_consent_at?: string | null;
          verification_token_hash?: string | null;
          verification_sent_at?: string | null;
          verification_expires_at?: string | null;
          allocation_order_at?: string | null;
          withdrawn_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          email?: string;
          normalized_email?: string;
          email_verified_at?: string | null;
          status?:
            | "pending_email_verification"
            | "phase1_accepted"
            | "phase2_waitlist"
            | "invited_phase2"
            | "withdrawn"
            | "rejected_abuse";
          phase_id?: string | null;
          seat_number?: number | null;
          primary_feature_interests?: string[];
          other_feature_interest_text?: string | null;
          device_platform?: "android" | "ios" | "both" | "not_sure" | null;
          preferred_language?: "en" | "hi";
          privacy_notice_version?: string;
          privacy_accepted_at?: string;
          beta_terms_version?: string;
          terms_accepted_at?: string;
          marketing_consent?: boolean;
          marketing_consent_at?: string | null;
          verification_token_hash?: string | null;
          verification_sent_at?: string | null;
          verification_expires_at?: string | null;
          allocation_order_at?: string | null;
          withdrawn_at?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "beta_applications_phase_id_fkey";
            columns: ["phase_id"];
            isOneToOne: false;
            referencedRelation: "beta_phases";
            referencedColumns: ["id"];
          }
        ];
      };
      email_outbox: {
        Row: {
          id: string;
          application_id: string | null;
          phase_id: string | null;
          message_type: "verification" | "phase1_accepted" | "phase2_waitlist" | "phase2_invite";
          recipient_email: string;
          template_key: string;
          locale: "en" | "hi";
          idempotency_key: string;
          status: "pending" | "processing" | "sent" | "failed" | "cancelled";
          attempt_count: number;
          next_attempt_at: string | null;
          provider_message_id: string | null;
          last_error_code: string | null;
          sent_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_id?: string | null;
          phase_id?: string | null;
          message_type: "verification" | "phase1_accepted" | "phase2_waitlist" | "phase2_invite";
          recipient_email: string;
          template_key: string;
          locale?: "en" | "hi";
          idempotency_key: string;
          status?: "pending" | "processing" | "sent" | "failed" | "cancelled";
          attempt_count?: number;
          next_attempt_at?: string | null;
          provider_message_id?: string | null;
          last_error_code?: string | null;
          sent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: "pending" | "processing" | "sent" | "failed" | "cancelled";
          attempt_count?: number;
          next_attempt_at?: string | null;
          provider_message_id?: string | null;
          last_error_code?: string | null;
          sent_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      audit_events: {
        Row: {
          id: string;
          actor_user_id: string;
          action: string;
          target_type: string;
          target_id: string | null;
          reason: string | null;
          metadata_safe: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_user_id?: string;
          action: string;
          target_type: string;
          target_id?: string | null;
          reason?: string | null;
          metadata_safe?: Json;
          created_at?: string;
        };
        Update: {
          actor_user_id?: string;
          action?: string;
          target_type?: string;
          target_id?: string | null;
          reason?: string | null;
          metadata_safe?: Json;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      confirm_and_allocate_application: {
        Args: {
          p_application_id: string;
          p_verified_email: string;
        };
        Returns: {
          application_id: string;
          allocated_status: string;
          allocated_seat_number: number | null;
          phase_key: string;
          is_idempotent_replay: boolean;
        }[];
      };
      withdraw_and_promote_application: {
        Args: {
          p_application_id: string;
          p_reason?: string;
        };
        Returns: {
          withdrawn_id: string;
          promoted_id: string | null;
          new_seat_number: number | null;
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
