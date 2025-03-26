"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
}

interface PageProps {
  params: {
    id: string
  }
}

export default function EditBlogPostPage({ params }: PageProps) {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<BlogPost>({
    id: params.id,
    title: "",
    excerpt: "",
    content: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(true)

  useEffect(() => {
    // Redirect if not admin
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/")
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      })
    }
  }, [user, isAdmin, isLoading, router])

  useEffect(() => {
    async function fetchPost() {
      setIsLoadingPost(true)

      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

      if (error) {
        console.error("Error fetching post:", error)
        toast({
          title: "Error",
          description: "Failed to load blog post.",
          variant: "destructive",
        })
        router.push("/admin/blog")
      } else if (data) {
        setFormData({
          id: data.id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
        })
      }

      setIsLoadingPost(false)
    }

    if (user && isAdmin) {
      fetchPost()
    }
  }, [user, isAdmin, params.id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()

    setIsSubmitting(false)

    if (error) {
      console.error("Error updating post:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      })
      router.push("/admin/blog")
    }
  }

  if (isLoading || !user || !isAdmin || isLoadingPost) {
    return (
      <div className="container py-20">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-20">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

