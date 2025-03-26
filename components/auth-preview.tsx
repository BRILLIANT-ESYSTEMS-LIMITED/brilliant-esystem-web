"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FcGoogle } from "react-icons/fc"
import { User, Shield } from "lucide-react"

export default function AuthPreview() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview">Authentication Overview</TabsTrigger>
          <TabsTrigger value="user">User Management</TabsTrigger>
          <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
              <CardDescription>Current state of the authentication system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isLoggedIn ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span>User Authentication</span>
                </div>
                <span className="text-sm text-muted-foreground">{isLoggedIn ? "Active" : "Inactive"}</span>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isAdmin ? "bg-green-500" : "bg-yellow-500"}`}></div>
                  <span>Admin Privileges</span>
                </div>
                <span className="text-sm text-muted-foreground">{isAdmin ? "Granted" : "Not Granted"}</span>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Google OAuth</span>
                </div>
                <span className="text-sm text-muted-foreground">Configured</span>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Email/Password Auth</span>
                </div>
                <span className="text-sm text-muted-foreground">Configured</span>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Row Level Security</span>
                </div>
                <span className="text-sm text-muted-foreground">Enabled</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {!isLoggedIn ? (
                <Button onClick={handleLogin}>Simulate Login</Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleAdminToggle}>
                    {isAdmin ? "Remove Admin" : "Grant Admin"}
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>Current security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium">Rate Limiting</p>
                  <p className="text-sm text-muted-foreground">Enabled (Default Supabase settings)</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium">Session Duration</p>
                  <p className="text-sm text-muted-foreground">1 week</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium">Password Policy</p>
                  <p className="text-sm text-muted-foreground">Minimum 8 characters</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium">Email Confirmation</p>
                  <p className="text-sm text-muted-foreground">Required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Current user data and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left">User ID</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 text-sm">81c3d796-b60a-...</td>
                      <td className="p-3">admin@esys.com</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          <Shield className="mr-1 h-3 w-3" /> Admin
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-sm">Sample User</td>
                      <td className="p-3">user@example.com</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
                          <User className="mr-1 h-3 w-3" /> Subscriber
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500">
                          Inactive
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authentication Methods</CardTitle>
              <CardDescription>Available sign-in options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="justify-start">
                  <FcGoogle className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="m@example.com"
                    />
                  </div>
                  <div className="grid gap-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Password
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                    />
                  </div>
                  <Button>Sign In</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Blog content management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-muted flex justify-between items-center">
                  <h3 className="font-medium">Blog Posts</h3>
                  <Button size="sm">New Post</Button>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Getting Started with Brilliant Esystems</h4>
                        <p className="text-sm text-muted-foreground">Published • March 26, 2025</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Top 10 Technology Trends for 2025</h4>
                        <p className="text-sm text-muted-foreground">Draft • March 24, 2025</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protected Routes</CardTitle>
              <CardDescription>Routes requiring authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>/admin/dashboard</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Admin Only</span>
                </div>
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>/admin/posts/new</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Admin Only</span>
                </div>
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>/admin/categories/new</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Admin Only</span>
                </div>
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    <span>/profile</span>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 px-2 py-1 rounded-full">
                    User Only
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

