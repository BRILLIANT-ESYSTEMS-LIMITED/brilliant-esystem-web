"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error fetching post:", error)
        router.push("/admin/dashboard")
      } else {
        setPost(data)
      }
    }

    fetchPost()
  }, [params.id, router, supabase])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    const { error } = await supabase
      .from("blog_posts")
      .update({
        title,
        slug,
        excerpt,
        content,
        published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)

    setIsLoading(false)

    if (error) {
      console.error("Error updating post:", error)
      toast.error("Failed to update post")
    } else {
      toast.success("Post updated successfully")
      router.push("/admin/dashboard")
    }
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Post: {post.title}</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={post.title}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={post.slug}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            defaultValue={post.excerpt}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            defaultValue={post.content}
            rows={10}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            name="published"
            defaultChecked={post.published}
          />
          <Label htmlFor="published">Published</Label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/dashboard")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
} 