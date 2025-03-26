"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Form submitted!",
      description: "We'll get back to you as soon as possible.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      budget: "",
      service: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have a question or want to work with us? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What service are you interested in?</Label>
                  <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-apps">Mobile Applications</SelectItem>
                      <SelectItem value="cloud-solutions">Cloud Solutions</SelectItem>
                      <SelectItem value="custom-software">Custom Software</SelectItem>
                      <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                      <SelectItem value="it-consulting">IT Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>What's your budget range?</Label>
                  <RadioGroup
                    value={formData.budget}
                    onValueChange={(value) => handleSelectChange("budget", value)}
                    className="grid gap-4 sm:grid-cols-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="less-than-5k" id="less-than-5k" />
                      <Label htmlFor="less-than-5k">Less than $5K</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5k-10k" id="5k-10k" />
                      <Label htmlFor="5k-10k">$5K - $10K</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10k-25k" id="10k-25k" />
                      <Label htmlFor="10k-25k">$10K - $25K</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="more-than-25k" id="more-than-25k" />
                      <Label htmlFor="more-than-25k">$25K+</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Our Office</h3>
                        <address className="not-italic text-muted-foreground">
                          123 Tech Avenue
                          <br />
                          Innovation District
                          <br />
                          Cityville, CV 12345
                          <br />
                          United States
                        </address>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Email Us</h3>
                        <p className="text-muted-foreground">
                          <a href="mailto:info@brilliantesystems.com" className="hover:text-primary">
                            info@brilliantesystems.com
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          <a href="mailto:support@brilliantesystems.com" className="hover:text-primary">
                            support@brilliantesystems.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Call Us</h3>
                        <p className="text-muted-foreground">
                          <a href="tel:+11234567890" className="hover:text-primary">
                            +1 (123) 456-7890
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          <a href="tel:+19876543210" className="hover:text-primary">
                            +1 (987) 654-3210
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Business Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit our office to meet our team and discuss your project in person.
            </p>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden border bg-muted">
            {/* This would be replaced with an actual map component */}
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-muted-foreground">Interactive Map Would Be Embedded Here</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

