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
      [_ in never]: never
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Profile = {
  id: string;
  name: string;
  wechat: string;
  email: string;
  bio: string;
  skills: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url: string | null;
  created_at: string;
  featured: boolean;
};

