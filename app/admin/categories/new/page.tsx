"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function NewCategory() {
  return (
    <ProtectedRoute adminOnly>
      <NewCategoryContent />
    </ProtectedRoute>
  )
}

function NewCategoryContent() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Auto-generate slug from name if slug field is empty
    if (name === "name" && !formData.slug) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!formData.name || !formData.slug) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Create category
      const { data, error } = await supabase
        .from("blog_categories")
        .insert({
          name: formData.name,
          slug: formData.slug,
          description: formData.description || null,
        })
        .select()

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "Category created successfully",
      })

      router.push("/admin/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create category",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Category</h1>
        <p className="text-muted-foreground">Add a new blog category to organize your posts</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
          <p className="text-sm text-muted-foreground">URL-friendly version of the name (e.g., technology)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Category"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

