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
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, 'id' | 'created_at'>;
        Update: Partial<Omit<Testimonial, 'id' | 'created_at'>>;
      };
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
  user_id: string | null;
  name: string | null;
  profession: string | null;
  wechat: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  skills: Object[] | null;
  hero_intro: string | null;
};

export type Project = {
  id: string;
  project_id: string | null;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url: string | null;
  github_url: string | null;
  created_at: string;
  featured: boolean;
};

export type Service = {
  id: string;
  project_id: string | null;
  title: string;
  description: string;
  icon_url: string | null;
  order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  project_id: string | null;
  name: string;
  role: string;
  quote: string;
  avatar_url: string;
  order: number;
  created_at: string;
};

