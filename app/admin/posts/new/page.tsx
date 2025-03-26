"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export default function NewPost() {
  return (
    <ProtectedRoute adminOnly>
      <NewPostContent />
    </ProtectedRoute>
  )
}

function NewPostContent() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    published: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const supabase = getSupabaseBrowserClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Auto-generate slug from title if slug field is empty
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      published: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!formData.title || !formData.slug || !formData.content) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Create post
      const { data, error } = await supabase
        .from("blog_posts")
        .insert({
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt || null,
          featured_image: formData.featured_image || null,
          published: formData.published,
          author_id: user!.id,
          published_at: formData.published ? new Date().toISOString() : null,
        })
        .select()

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "Post created successfully",
      })

      router.push("/admin/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="text-muted-foreground">Add a new blog post to your website</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
          <p className="text-sm text-muted-foreground">URL-friendly version of the title (e.g., my-blog-post)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} />
          <p className="text-sm text-muted-foreground">A short summary of the post (optional)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="featured_image">Featured Image URL</Label>
          <Input id="featured_image" name="featured_image" value={formData.featured_image} onChange={handleChange} />
          <p className="text-sm text-muted-foreground">URL to the featured image for this post (optional)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content *</Label>
          <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} required />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="published" checked={formData.published} onCheckedChange={handleSwitchChange} />
          <Label htmlFor="published">Publish immediately</Label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Post"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

