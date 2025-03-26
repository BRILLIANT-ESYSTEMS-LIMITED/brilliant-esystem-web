export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          published: boolean
          created_at: string
          updated_at: string
          published_at: string | null
          author_id: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
          published_at?: string | null
          author_id: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
          published_at?: string | null
          author_id?: string
        }
      }
      blog_posts_categories: {
        Row: {
          post_id: string
          category_id: string
        }
        Insert: {
          post_id: string
          category_id: string
        }
        Update: {
          post_id?: string
          category_id?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
    }
  }
}

