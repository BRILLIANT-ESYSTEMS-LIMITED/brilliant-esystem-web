"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function EditCategory({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [category, setCategory] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const fetchCategory = async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error fetching category:", error)
        router.push("/admin/dashboard")
      } else {
        setCategory(data)
      }
    }

    fetchCategory()
  }, [params.id, router, supabase])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string

    const { error } = await supabase
      .from("blog_categories")
      .update({ name, slug })
      .eq("id", params.id)

    setIsLoading(false)

    if (error) {
      console.error("Error updating category:", error)
      toast.error("Failed to update category")
    } else {
      toast.success("Category updated successfully")
      router.push("/admin/dashboard")
    }
  }

  if (!category) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Category: {category.name}</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={category.name}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={category.slug}
            required
          />
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