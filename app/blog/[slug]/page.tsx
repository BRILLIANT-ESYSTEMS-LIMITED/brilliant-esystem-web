import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const supabase = getSupabaseServerClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select(`
      *,
      profiles (
        email,
        full_name,
        avatar_url
      )
    `)
    .eq("slug", params.slug)
    .eq("published", true)
    .single()

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = getSupabaseServerClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select(`
      *,
      profiles (
        email,
        full_name,
        avatar_url
      )
    `)
    .eq("slug", params.slug)
    .eq("published", true)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-12 max-w-4xl">
      <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{post.title}</h1>

      <div className="flex items-center gap-4 mb-8">
        {post.profiles?.avatar_url && (
          <img
            src={post.profiles.avatar_url}
            alt={post.profiles.full_name || "Author"}
            className="w-6 h-6 rounded-full"
          />
        )}
        <span>{post.profiles?.full_name || "Anonymous"}</span>
        <span>•</span>
        <span>
          {new Date(post.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {post.featured_image && (
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.content.split("\n").map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}

