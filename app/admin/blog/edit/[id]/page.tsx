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

interface PageProps {
  params: {
    id: string
  }
}

export default function BlogEditPage({ params }: PageProps) {
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, profiles(*)")
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error fetching post:", error)
        router.push("/admin/blog")
      } else {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="container py-10 flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!post) {
    return <div className="container py-10">Post not found</div>
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/admin/blog">← Back to Blog Posts</Link>
        </Button>
      </div>
      <BlogPostForm post={post} />
    </div>
  )
}

