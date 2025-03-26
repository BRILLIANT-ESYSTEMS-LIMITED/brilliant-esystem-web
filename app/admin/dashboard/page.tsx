"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, Trash2 } from "lucide-react"

export default function AdminDashboard() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}

function AdminDashboardContent() {
  const [posts, setPosts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { user } = useAuth()
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      // Fetch blog posts
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (postsError) {
        console.error("Error fetching posts:", postsError)
      } else {
        setPosts(postsData || [])
      }

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name", { ascending: true })

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError)
      } else {
        setCategories(categoriesData || [])
      }

      setIsLoading(false)
    }

    fetchData()
  }, [supabase])

  const handleDeletePost = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) {
        console.error("Error deleting post:", error)
      } else {
        setPosts(posts.filter((post) => post.id !== id))
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const { error } = await supabase.from("blog_categories").delete().eq("id", id)

      if (error) {
        console.error("Error deleting category:", error)
      } else {
        setCategories(categories.filter((category) => category.id !== id))
      }
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your blog content</p>
      </div>

      <Tabs defaultValue="posts">
        <TabsList className="mb-6">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Blog Posts</h2>
            <Button asChild>
              <Link href="/admin/posts/new">
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {post.published ? "Published" : "Draft"} • {new Date(post.created_at).toLocaleDateString()}
                        </p>
                        {post.excerpt && <p className="mt-2 text-muted-foreground line-clamp-2">{post.excerpt}</p>}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/admin/posts/edit/${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No blog posts found. Create your first post!</p>
                <Button className="mt-4" asChild>
                  <Link href="/admin/posts/new">
                    <Plus className="mr-2 h-4 w-4" /> New Post
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="categories">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Categories</h2>
            <Button asChild>
              <Link href="/admin/categories/new">
                <Plus className="mr-2 h-4 w-4" /> New Category
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          ) : categories.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">Slug: {category.slug}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/admin/categories/edit/${category.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No categories found. Create your first category!</p>
                <Button className="mt-4" asChild>
                  <Link href="/admin/categories/new">
                    <Plus className="mr-2 h-4 w-4" /> New Category
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

