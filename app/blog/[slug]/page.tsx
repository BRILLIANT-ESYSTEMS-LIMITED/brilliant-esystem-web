import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

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

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  published: boolean
  created_at: string
  updated_at: string
}

export default function BlogPost({ params }: BlogPostPageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getPost() {
      try {
        const { data, error } = await getSupabaseServerClient()
          .from("blog_posts")
          .select("*")
          .eq("slug", params.slug)
          .single()

        if (error) throw error
        if (!data) {
          router.push("/blog")
          return
        }

        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
        router.push("/blog")
      } finally {
        setLoading(false)
      }
    }

    getPost()
  }, [params.slug, router])

  const CodeBlock: Components["code"] = ({ className, children, node, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    const inline = !match

    return !inline ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match ? match[1] : "text"}
        PreTag="div"
        customStyle={{}}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-8"></div>
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gray-200"></div>
          </div>
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
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push("/blog")}
      >
        ← Back to Blog
      </Button>

      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-muted-foreground mb-8">
        {format(new Date(post.created_at), "MMMM d, yyyy")}
      </p>

      {post.featured_image && (
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            code: CodeBlock,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

