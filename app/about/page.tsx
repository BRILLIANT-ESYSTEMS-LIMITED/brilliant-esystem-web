import Image from "next/image"
import Link from "next/link"
import { Award, CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About Brilliant Esystems</h1>
              <p className="text-xl text-muted-foreground mb-6">
                We're a team of passionate technologists dedicated to helping businesses succeed in the digital world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="https://picsum.photos/seed/brilliant-team/600/400"
                alt="Brilliant Esystems team"
                width={600}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1 relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="https://picsum.photos/seed/brilliant-office/600/400"
                alt="Brilliant Esystems office"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010, Brilliant Esystems began with a simple mission: to help businesses leverage
                  technology to achieve their goals. What started as a small team of three developers has grown into a
                  full-service technology company with expertise across web development, mobile applications, cloud
                  solutions, and digital marketing.
                </p>
                <p>
                  Over the years, we've partnered with businesses of all sizes, from startups to enterprises, across
                  various industries. Our approach has always been to understand our clients' unique challenges and
                  develop tailored solutions that drive real results.
                </p>
                <p>
                  Today, we're proud to have a diverse team of over 50 professionals who bring their creativity,
                  technical expertise, and passion to every project. As technology continues to evolve, we remain
                  committed to staying at the forefront of innovation and delivering exceptional value to our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do at Brilliant Esystems.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-background rounded-lg p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in everything we do, from code quality to client communication. We're not
                satisfied with "good enough" – we aim to exceed expectations.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe in the power of collaboration – both within our team and with our clients. By working
                together, we can achieve more than we could individually.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                We embrace innovation and continuously explore new technologies and approaches. This allows us to
                deliver cutting-edge solutions that give our clients a competitive edge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The talented individuals who guide our company's vision and strategy.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <TeamMember image="https://picsum.photos/seed/ceo/300/300" name="Alex Johnson" position="CEO & Founder" />
            <TeamMember image="https://picsum.photos/seed/cto/300/300" name="Sophia Chen" position="CTO" />
            <TeamMember
              image="https://picsum.photos/seed/creative/300/300"
              name="Michael Rodriguez"
              position="Creative Director"
            />
            <TeamMember
              image="https://picsum.photos/seed/marketing/300/300"
              name="Emily Williams"
              position="Head of Marketing"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12+</div>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-xl bg-primary p-8 md:p-12 lg:p-16 text-primary-foreground">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Work With Us?</h2>
              <p className="text-xl mb-8">Let's discuss how our team can help bring your vision to life.</p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function TeamMember({
  image,
  name,
  position,
}: {
  image: string
  name: string
  position: string
}) {
  return (
    <div className="text-center">
      <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full mb-6">
        <Image src={image} alt={name} width={300} height={300} className="object-cover" />
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-muted-foreground">{position}</p>
    </div>
  )
}

