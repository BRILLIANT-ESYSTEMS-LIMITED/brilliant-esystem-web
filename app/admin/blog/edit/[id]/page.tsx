"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { BlogPostForm } from "@/components/blog-post-form"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Props {
  params: {
    slug: string
  }
}

export default function EditBlogPost({ params }: Props) {
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getPost() {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", params.slug)
          .single()

        if (error) throw error
        if (!data) {
          router.push("/admin/blog")
          return
        }

        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
        router.push("/admin/blog")
      } finally {
        setLoading(false)
      }
    }

    getPost()
  }, [params.slug, router])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Edit Blog Post</h1>
      <BlogPostForm post={post} />
    </div>
  )
}

