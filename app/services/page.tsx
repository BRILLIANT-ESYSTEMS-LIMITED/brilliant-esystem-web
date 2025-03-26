import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Code, Database, Globe, Layers, Lightbulb, MessageSquare, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We offer a comprehensive range of technology solutions to help your business succeed in the digital age.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              icon={<Globe className="h-10 w-10" />}
              title="Web Development"
              description="Custom websites and web applications built with the latest technologies to deliver exceptional user experiences."
              features={[
                "Responsive design for all devices",
                "E-commerce solutions",
                "Content management systems",
                "Progressive web applications",
                "API development and integration",
              ]}
              href="/services/web-development"
            />
            <ServiceCard
              icon={<Smartphone className="h-10 w-10" />}
              title="Mobile Applications"
              description="Native and cross-platform mobile apps for iOS and Android that engage users and drive business growth."
              features={[
                "iOS and Android development",
                "Cross-platform solutions",
                "UI/UX design",
                "App store optimization",
                "Maintenance and support",
              ]}
              href="/services/mobile-apps"
            />
            <ServiceCard
              icon={<Layers className="h-10 w-10" />}
              title="Cloud Solutions"
              description="Scalable cloud infrastructure and migration services to optimize your operations and reduce costs."
              features={[
                "Cloud migration",
                "Infrastructure as a Service (IaaS)",
                "Platform as a Service (PaaS)",
                "DevOps automation",
                "24/7 monitoring and support",
              ]}
              href="/services/cloud-solutions"
            />
            <ServiceCard
              icon={<Code className="h-10 w-10" />}
              title="Custom Software"
              description="Bespoke software solutions tailored to your business needs, from enterprise applications to specialized tools."
              features={[
                "Requirements analysis",
                "Custom development",
                "Legacy system modernization",
                "Integration with existing systems",
                "Ongoing maintenance and updates",
              ]}
              href="/services/custom-software"
            />
            <ServiceCard
              icon={<MessageSquare className="h-10 w-10" />}
              title="Digital Marketing"
              description="Strategic digital marketing to grow your online presence, attract customers, and drive conversions."
              features={[
                "Search engine optimization (SEO)",
                "Pay-per-click advertising (PPC)",
                "Social media marketing",
                "Content marketing",
                "Analytics and reporting",
              ]}
              href="/services/digital-marketing"
            />
            <ServiceCard
              icon={<Lightbulb className="h-10 w-10" />}
              title="IT Consulting"
              description="Expert advice on technology strategy and implementation to help you make informed decisions."
              features={[
                "Technology assessment",
                "Digital transformation strategy",
                "IT roadmap development",
                "Vendor selection",
                "Project management",
              ]}
              href="/services/it-consulting"
            />
            <ServiceCard
              icon={<Database className="h-10 w-10" />}
              title="Data Analytics"
              description="Turn your data into actionable insights with our comprehensive data analytics services."
              features={[
                "Data warehousing",
                "Business intelligence",
                "Predictive analytics",
                "Data visualization",
                "Machine learning solutions",
              ]}
              href="/services/data-analytics"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ProcessStep
              number="01"
              title="Discovery"
              description="We start by understanding your business goals, target audience, and project requirements."
            />
            <ProcessStep
              number="02"
              title="Planning"
              description="We create a detailed project plan, including timeline, milestones, and deliverables."
            />
            <ProcessStep
              number="03"
              title="Development"
              description="Our team builds your solution using agile methodologies with regular updates and feedback."
            />
            <ProcessStep
              number="04"
              title="Deployment"
              description="We launch your solution and provide ongoing support and maintenance."
            />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Technologies We Use</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We leverage the latest technologies to deliver high-quality solutions.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Frontend</h3>
              <div className="grid grid-cols-2 gap-4">
                <TechItem name="React" />
                <TechItem name="Next.js" />
                <TechItem name="Angular" />
                <TechItem name="Vue.js" />
                <TechItem name="TypeScript" />
                <TechItem name="Tailwind CSS" />
                <TechItem name="React Native" />
                <TechItem name="Flutter" />
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Backend</h3>
              <div className="grid grid-cols-2 gap-4">
                <TechItem name="Node.js" />
                <TechItem name="Python" />
                <TechItem name="Java" />
                <TechItem name="PHP" />
                <TechItem name="Ruby on Rails" />
                <TechItem name="ASP.NET Core" />
                <TechItem name="GraphQL" />
                <TechItem name="REST APIs" />
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Database</h3>
              <div className="grid grid-cols-2 gap-4">
                <TechItem name="MongoDB" />
                <TechItem name="PostgreSQL" />
                <TechItem name="MySQL" />
                <TechItem name="Firebase" />
                <TechItem name="Redis" />
                <TechItem name="Elasticsearch" />
                <TechItem name="SQL Server" />
                <TechItem name="DynamoDB" />
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Cloud & DevOps</h3>
              <div className="grid grid-cols-2 gap-4">
                <TechItem name="AWS" />
                <TechItem name="Azure" />
                <TechItem name="Google Cloud" />
                <TechItem name="Docker" />
                <TechItem name="Kubernetes" />
                <TechItem name="CI/CD" />
                <TechItem name="Terraform" />
                <TechItem name="Jenkins" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Contact us today to discuss your project and how we can help you achieve your business goals.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="https://picsum.photos/seed/services-contact/600/400"
                alt="Contact us"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ServiceCard({
  icon,
  title,
  description,
  features,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  href: string
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="mb-4 text-primary">{icon}</div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mb-6">{description}</CardDescription>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="p-0 h-auto" asChild>
          <Link href={href} className="flex items-center text-primary">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function TechItem({ name }: { name: string }) {
  return (
    <div className="flex items-center">
      <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
      <span>{name}</span>
    </div>
  )
}

