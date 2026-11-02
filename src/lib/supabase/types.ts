export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type CohortStatus = 'draft' | 'open' | 'full' | 'closed';
export type ApplicationStatus = 'pending_verification' | 'phase1_accepted' | 'phase2_waitlist' | 'withdrawn';
export type DevicePlatform = 'ios' | 'android' | 'both';
export type PreferredLanguage = 'en' | 'hi';
export type OutboxMessageType = 'verification_magic_link' | 'phase1_accepted' | 'phase2_waitlist' | 'phase1_promotion';
export type OutboxStatus = 'pending' | 'processing' | 'sent' | 'failed' | 'cancelled';

export interface Database {
  public: {
    Tables: {
      beta_phases: {
        Row: {
          id: string;
          phase_key: string;
          display_name: string;
          capacity: number;
          allocated_count: number;
          status: CohortStatus;
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
          allocated_count?: number;
          status?: CohortStatus;
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
          allocated_count?: number;
          status?: CohortStatus;
          opens_at?: string | null;
          closes_at?: string | null;
          created_at?: string;
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
          status: ApplicationStatus;
          phase_id: string | null;
          seat_number: number | null;
          health_goals: string[];
          feature_priorities: string[];
          other_feature_text: string | null;
          device_platform: DevicePlatform;
          preferred_language: PreferredLanguage;
          privacy_notice_version: string;
          privacy_accepted_at: string;
          beta_terms_version: string;
          terms_accepted_at: string;
          marketing_consent: boolean;
          marketing_consent_at: string | null;
          application_created_at: string;
          verification_sent_at: string | null;
          email_verified_at: string | null;
          allocation_order_at: string | null;
          decision_at: string | null;
          withdrawn_at: string | null;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          normalized_email: string;
          status?: ApplicationStatus;
          phase_id?: string | null;
          seat_number?: number | null;
          health_goals?: string[];
          feature_priorities?: string[];
          other_feature_text?: string | null;
          device_platform: DevicePlatform;
          preferred_language?: PreferredLanguage;
          privacy_notice_version?: string;
          privacy_accepted_at?: string;
          beta_terms_version?: string;
          terms_accepted_at?: string;
          marketing_consent?: boolean;
          marketing_consent_at?: string | null;
          application_created_at?: string;
          verification_sent_at?: string | null;
          email_verified_at?: string | null;
          allocation_order_at?: string | null;
          decision_at?: string | null;
          withdrawn_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          normalized_email?: string;
          status?: ApplicationStatus;
          phase_id?: string | null;
          seat_number?: number | null;
          health_goals?: string[];
          feature_priorities?: string[];
          other_feature_text?: string | null;
          device_platform?: DevicePlatform;
          preferred_language?: PreferredLanguage;
          privacy_notice_version?: string;
          privacy_accepted_at?: string;
          beta_terms_version?: string;
          terms_accepted_at?: string;
          marketing_consent?: boolean;
          marketing_consent_at?: string | null;
          application_created_at?: string;
          verification_sent_at?: string | null;
          email_verified_at?: string | null;
          allocation_order_at?: string | null;
          decision_at?: string | null;
          withdrawn_at?: string | null;
        };
        Relationships: [];
      };
      email_outbox: {
        Row: {
          id: string;
          application_id: string | null;
          phase_id: string | null;
          message_type: OutboxMessageType;
          recipient_normalized: string;
          template_key: string;
          locale: PreferredLanguage;
          idempotency_key: string;
          status: OutboxStatus;
          attempt_count: number;
          next_attempt_at: string;
          provider_message_id: string | null;
          last_error_code: string | null;
          created_at: string;
          sent_at: string | null;
        };
        Insert: {
          id?: string;
          application_id?: string | null;
          phase_id?: string | null;
          message_type: OutboxMessageType;
          recipient_normalized: string;
          template_key: string;
          locale?: PreferredLanguage;
          idempotency_key: string;
          status?: OutboxStatus;
          attempt_count?: number;
          next_attempt_at?: string;
          provider_message_id?: string | null;
          last_error_code?: string | null;
          created_at?: string;
          sent_at?: string | null;
        };
        Update: {
          id?: string;
          application_id?: string | null;
          phase_id?: string | null;
          message_type?: OutboxMessageType;
          recipient_normalized?: string;
          template_key?: string;
          locale?: PreferredLanguage;
          idempotency_key?: string;
          status?: OutboxStatus;
          attempt_count?: number;
          next_attempt_at?: string;
          provider_message_id?: string | null;
          last_error_code?: string | null;
          created_at?: string;
          sent_at?: string | null;
        };
        Relationships: [];
      };
      audit_events: {
        Row: {
          id: string;
          actor_user_id: string | null;
          action: string;
          target_type: string;
          target_id: string;
          reason: string | null;
          metadata_safe: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_user_id?: string | null;
          action: string;
          target_type: string;
          target_id: string;
          reason?: string | null;
          metadata_safe?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_user_id?: string | null;
          action?: string;
          target_type?: string;
          target_id?: string;
          reason?: string | null;
          metadata_safe?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Functions: {
      confirm_and_allocate_application: {
        Args: {
          p_application_id: string;
          p_verified_email: string;
        };
        Returns: {
          status: ApplicationStatus;
          seat_number: number | null;
          phase_key: string;
          already_allocated: boolean;
        };
      };
      promote_waitlist_applicant: {
        Args: {
          p_withdrawn_application_id: string;
        };
        Returns: {
          promoted: boolean;
          promoted_application_id?: string;
          seat_number?: number;
          reason?: string;
        };
      };
    };
    Views: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
