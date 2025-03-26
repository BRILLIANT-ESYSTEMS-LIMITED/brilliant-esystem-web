"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase/client"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  created_at: string
  updated_at: string
}

export default function AdminBlogPage() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

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
    async function fetchPosts() {
      setIsLoadingPosts(true)

      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching posts:", error)
        toast({
          title: "Error",
          description: "Failed to load blog posts.",
          variant: "destructive",
        })
      } else {
        setPosts(data as BlogPost[])
      }

      setIsLoadingPosts(false)
    }

    if (user && isAdmin) {
      fetchPosts()
    }
  }, [user, isAdmin])

  const handleDeletePost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive",
      })
    } else {
      setPosts(posts.filter((post) => post.id !== id))
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      })
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>

      {isLoadingPosts ? (
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No blog posts found.</p>
              <Button asChild>
                <Link href="/admin/blog/new">Create your first post</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{format(new Date(post.created_at), "MMMM d, yyyy")}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeletePost(post.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

