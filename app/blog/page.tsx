"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  published: boolean
  created_at: string
  updated_at: string
  published_at: string
  author_id: string
  profiles: {
    email: string
    full_name: string | null
    avatar_url: string | null
  } | null
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from("blog_posts")
          .select(`
            *,
            profiles (
              email,
              full_name,
              avatar_url
            )
          `)
          .eq("published", true)
          .order("published_at", { ascending: false })

        if (error) {
          console.error("Error fetching posts:", error)
          setError(error.message)
          return
        }

        if (!data || data.length === 0) {
          setPosts([])
          setFeaturedPost(null)
          return
        }

        const transformedData = data as BlogPost[]
        setFeaturedPost(transformedData[0])
        setPosts(transformedData.slice(1))
      } catch (err) {
        console.error("Error in fetchPosts:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [supabase])

  if (error) {
    return (
      <section className="py-20">
        <div className="container">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-red-500">Error loading blog posts: {error}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with our latest articles, insights, and industry news.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {isLoading ? (
        <section className="py-20">
          <div className="container">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          </div>
        </section>
      ) : featuredPost ? (
        <section className="py-20">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                  src={featuredPost.featured_image || "https://picsum.photos/600/400"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {featuredPost.profiles?.avatar_url && (
                    <Image
                      src={featuredPost.profiles.avatar_url}
                      alt={featuredPost.profiles.full_name || "Author"}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span>{featuredPost.profiles?.full_name || "Anonymous"}</span>
                  <span>•</span>
                  <span>
                    {new Date(featuredPost.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.excerpt || featuredPost.content.substring(0, 200) + "..."}
                </p>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Blog Posts Grid */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12">Latest Articles</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  image={post.featured_image || "https://picsum.photos/400/200"}
                  title={post.title}
                  excerpt={post.excerpt || post.content.substring(0, 150) + "..."}
                  author={post.profiles?.full_name || "Anonymous"}
                  authorImage={post.profiles?.avatar_url}
                  date={new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  href={`/blog/${post.slug}`}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No blog posts found.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </>
  )
}

function BlogPostCard({
  image,
  title,
  excerpt,
  author,
  authorImage,
  date,
  href,
}: {
  image: string
  title: string
  excerpt: string
  author: string
  authorImage?: string | null
  date: string
  href: string
}) {
  return (
    <Link href={href} className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {authorImage && (
            <Image
              src={authorImage}
              alt={author}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{title}</h3>
        <p className="mt-2 text-muted-foreground">{excerpt}</p>
      </div>
    </Link>
  )
}

