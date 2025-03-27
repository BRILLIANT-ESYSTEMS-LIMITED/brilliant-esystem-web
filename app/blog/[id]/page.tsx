"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@supabase/supabase-js"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import type { Components } from "react-markdown"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface PageProps {
  params: {
    id: string
  }
}

interface BlogPost {
  id: string
  title: string
  excerpt?: string
  content: string
  created_at: string
  profiles?: {
    email: string
    full_name: string | null
    avatar_url: string | null
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
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
        router.push("/blog")
      } else {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [params.id, router])

  const CodeBlock: Components["code"] = ({ className, children, node, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    const inline = !match

    return !inline ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match ? match[1] : "text"}
        PreTag="div"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

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
          <Link href="/blog">← Back to Blog</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {post.profiles?.full_name && (
              <span>By {post.profiles.full_name} · </span>
            )}
            <time dateTime={post.created_at}>
              {format(new Date(post.created_at), "MMMM d, yyyy")}
            </time>
          </div>
        </CardHeader>
        <CardContent>
          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          )}
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown components={{ code: CodeBlock }}>
              {post.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 