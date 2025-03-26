import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe, Layers, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20">
        <div className="container relative z-10">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Transforming Ideas Into <span className="text-primary">Digital Reality</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We build innovative technology solutions that help businesses thrive in the digital age.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="https://picsum.photos/600/400"
                  alt="Digital transformation illustration"
                  width={600}
                  height={400}
                  className="rounded-md object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer a comprehensive range of technology solutions to help your business succeed.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Globe className="h-10 w-10" />,
                title: "Web Development",
                description: "Custom websites and web applications built with the latest technologies.",
              },
              {
                icon: <Smartphone className="h-10 w-10" />,
                title: "Mobile Applications",
                description: "Native and cross-platform mobile apps for iOS and Android devices.",
              },
              {
                icon: <Layers className="h-10 w-10" />,
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and migration services.",
              },
            ].map((service, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-4 text-primary">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link href="#" className="flex items-center text-primary">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

