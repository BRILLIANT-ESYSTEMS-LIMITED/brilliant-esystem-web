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

export default function NewBlogPostPage() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          author_id: user?.id,
        },
      ])
      .select()

    setIsSubmitting(false)

    if (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to create blog post.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Blog post created successfully.",
      })
      router.push("/admin/blog")
    }
  }

  if (isLoading || !user || !isAdmin) {
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
          <CardTitle>Create New Blog Post</CardTitle>
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
                {isSubmitting ? "Creating..." : "Create Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

