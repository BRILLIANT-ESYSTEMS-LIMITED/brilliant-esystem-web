"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@supabase/supabase-js"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import type { Components } from "react-markdown"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featured_image: z.string().optional(),
  published: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface BlogPostFormProps {
  post?: {
    id: string
    title: string
    slug: string
    excerpt?: string
    content: string
    featured_image?: string
    published: boolean
  }
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter()
  const [isPreview, setIsPreview] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      featured_image: post?.featured_image || "",
      published: post?.published || false,
    },
  })

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

  async function onSubmit(values: FormValues) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)

      if (post?.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(values)
          .eq("id", post.id)

        if (error) throw error
        toast({ title: "Blog post updated successfully!" })
      } else {
        const { error } = await supabase.from("blog_posts").insert([values])

        if (error) throw error
        toast({ title: "Blog post created successfully!" })
      }

      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error saving post:", error)
      toast({
        title: "Error saving post",
        description: "Please try again later",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My awesome blog post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="my-awesome-blog-post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief summary of your blog post"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="featured_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant={isPreview ? "outline" : "default"}
              onClick={() => setIsPreview(false)}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant={isPreview ? "default" : "outline"}
              onClick={() => setIsPreview(true)}
            >
              Preview
            </Button>
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  {isPreview ? (
                    <div className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 prose dark:prose-invert">
                      <ReactMarkdown components={{ code: CodeBlock }}>
                        {field.value}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <Textarea
                      placeholder="Write your blog post content in markdown"
                      className="min-h-[200px] font-mono"
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Published</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">{post ? "Update" : "Create"} Post</Button>
      </form>
    </Form>
  )
} 